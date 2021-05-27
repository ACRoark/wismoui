import googleTagManager from 'services/googleTagManager';
import { httpClient, IHttpError, IHttpResponse } from 'services/httpClient';
import { IOrder } from 'types';
import isOrderInactive from 'utils/isOrderInactive';
import isOrderInvalid from 'utils/isOrderInvalid';
import shouldIncludeResult from './shouldIncludeResult';

const buildUrl = (url: string, orderNumber: string, name: string): string =>
  url.replace('{orderNumber}', orderNumber).replace('{name}', name);

const findOrderAsync = async (
  url: string,
  orderNumber: string,
  name: string,
  recaptchaToken: string,
  bug2263?: boolean,
): Promise<IOrder> => {
  if (isOrderInvalid(orderNumber)) {
    throw Error('ORDER_INVALID');
  }

  const requestUrl = buildUrl(url, orderNumber, name);

  return httpClient
    .get(requestUrl, {
      headers: {
        'x-recaptcha-token': recaptchaToken,
      },
    })
    .then(
      (response: IHttpResponse): IOrder => {
        if (response) {
          googleTagManager.trackServiceResponse(url, 'GET', response);

          const order = response.data;

          if (bug2263) {
            if (!shouldIncludeResult(order, bug2263)) {
              throw Error('ORDER_INACTIVE');
            }
          } else if (isOrderInactive(order)) {
            throw Error('ORDER_INACTIVE');
          }

          return order;
        }

        throw new Error('findOrderAsync response is empty!');
      },
    )
    .catch(
      (error: IHttpError): IOrder => {
        googleTagManager.trackServiceFailure(url, 'GET', error);

        // TODO: We need to determine how to return this information to the caller efficiently
        //       Perhaps we should return IFindOrderResponse which is defined as: {
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

        throw error;
      },
    );
};

export default findOrderAsync;
