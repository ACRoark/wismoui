import { getAuthToken } from 'security/utils';
import googleTagManager from 'services/googleTagManager';
import { httpClient, IHttpError, IHttpResponse } from 'services/httpClient';
import { IOrderSearchResult } from 'types';
import IOrderSearchResults from 'types/IOrderSearchResults';

import shouldIncludeResult from './shouldIncludeResult';

const filterInactiveOrders = (results: IOrderSearchResults, bug2263?: boolean): IOrderSearchResults => ({
  counts: { ...results.counts },
  orders: results.orders.filter((result: IOrderSearchResult): boolean => {
    if (bug2263) {
      return shouldIncludeResult(result, bug2263);
    }
    return shouldIncludeResult(result);
  }),
});

const searchOrdersAsync = async (url: string, bug2263?: boolean): Promise<IOrderSearchResults> => {
  const token = getAuthToken();

  return httpClient
    .get(url, {
      headers: {
        authorization: token,
      },
    })
    .then(
      (response: IHttpResponse): IOrderSearchResults => {
        if (response) {
          googleTagManager.trackServiceResponse(url, 'GET', response);
          if (bug2263) {
            return filterInactiveOrders(response.data, bug2263);
          }
          return filterInactiveOrders(response.data);
        }

        throw new Error('searchOrderAsync response is empty!');
      },
    )
    .catch(
      (error: IHttpError): IOrderSearchResults => {
        googleTagManager.trackServiceFailure(url, 'GET', error);

        // TODO: We need to determine how to return this information to the caller efficiently
        //       Perhaps we should return ISearchOrderResponse which is defined as: {
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
        //     should not happen - we should get an empty array instead
        //   }
        //   case 500:
        //   case 502:
        //   case 503: {
        //     Service Unavailable
        //   }
        // }

        throw error;
      },
    );
};

export default searchOrdersAsync;
