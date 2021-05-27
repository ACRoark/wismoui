import { getAuthToken } from 'security/utils';
import googleTagManager from 'services/googleTagManager';
import { httpClient, IHttpError, IHttpResponse } from 'services/httpClient';
import { IOrder } from 'types';

// Temporary
const enrich = (order: IOrder): IOrder => order;

const getOrderAsync = async (url: string, orderNumber: string): Promise<IOrder> => {
  const token = getAuthToken();

  const requestUrl = url.replace('{orderNumber}', orderNumber);

  return httpClient
    .get(requestUrl, {
      headers: {
        authorization: token,
      },
    })
    .then(
      (response: IHttpResponse): IOrder => {
        if (response) {
          googleTagManager.trackServiceResponse(requestUrl, 'GET', response);

          return enrich(response.data);
        }

        throw new Error('getOrderAsync response is empty!');
      },
    )
    .catch(
      (error: IHttpError): IOrder => {
        googleTagManager.trackServiceFailure(requestUrl, 'GET', error);

        // TODO: We need to determine how to return this information to the caller efficiently
        //       Perhaps we should return IGetOrderResponse which is defined as: {
        //         error?: {
        //           code: string; -- the HTTP Status code
        //           reason: string; -- the text description of the error
        //         },
        //         order: IOrder,
        //       }
        //     The error attribute in Redux state should be updated to this structure
        //
        // switch (error.code) {
        //   case 404: {
        //     An open order was not found
        //   }
        //   case 500:
        //   case 502:
        //   case 503: {
        //     Service Unavailable
        //   }
        // }

        // eslint-disable-next-line no-console
        console.warn(`Order ${orderNumber} was not found.`);

        throw error;
      },
    );
};

export default getOrderAsync;
