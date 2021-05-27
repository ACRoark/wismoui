import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { IHttpClient, IHttpError } from './types';

const cancelTokenSource = axios.CancelToken.source();

const buildAxiosInstance = (): AxiosInstance => {
  const instance: AxiosInstance = axios.create({
    baseURL: '', // config.baseUrl,
    cancelToken: cancelTokenSource.token,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    responseType: 'json',
    timeout: 10000,
  });

  instance.interceptors.request.use(onRequestSuccess);
  instance.interceptors.response.use(onResponseSuccess, onResponseError);

  return instance;
};

const onRequestSuccess = (config: AxiosRequestConfig): AxiosRequestConfig => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('AXIOS - Sending Request: ', config);
  }

  return config;
};

// tslint:disable-next-line: no-any
const onResponseSuccess = (response: AxiosResponse<any>): AxiosResponse<any> => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('AXIOS - Successful Response: ', response);
  }

  return response;
};

// tslint:disable-next-line: no-any
const onResponseError = (error: AxiosError<any>): Promise<IHttpError> => {
  const httpError: IHttpError = {
    code: error.response?.status || 0,
    message: error.message,
    name: error.name,
    reason: error.response?.statusText || '',
  };

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('AXIOS - Error Response: ', httpError);
  }

  return Promise.reject(httpError);
};

const httpClientFactory = (): IHttpClient => {
  const instance = buildAxiosInstance();

  return {
    cancel: (): void => cancelTokenSource.cancel(),
    // tslint:disable-next-line: no-any
    get: instance.get,
    post: instance.post,
    wasCancelled: axios.isCancel,
  };
};

const httpClient = httpClientFactory();

export default httpClient;
