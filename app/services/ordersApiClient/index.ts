import { IOrder } from 'types';
import IOrderSearchResults from 'types/IOrderSearchResults';

import findOrderAsync from './findOrderAsync';
import getOrderAsync from './getOrderAsync';
import searchOrdersAsync from './searchOrdersAsync';

interface IOrdersApi {
  findOrderAsync: (
    url: string,
    orderNumber: string,
    name: string,
    recaptchaToken: string,
    bug2263?: boolean,
  ) => Promise<IOrder>;
  getOrderAsync: (url: string, orderNumber: string) => Promise<IOrder>;
  searchOrdersAsync: (url: string, bug2263?: boolean) => Promise<IOrderSearchResults>;
}

const ordersApiClient: IOrdersApi = {
  findOrderAsync,
  getOrderAsync,
  searchOrdersAsync,
};

export default ordersApiClient;
