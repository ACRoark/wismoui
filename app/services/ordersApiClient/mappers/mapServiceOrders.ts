import { IOrderRequest, IServiceOrderViewModel } from 'types';

import mapServiceOrder from './mapServiceOrder';

const mapServiceOrders = (orderRequests: IOrderRequest[]): IServiceOrderViewModel[] =>
  orderRequests.map((request: IOrderRequest): IServiceOrderViewModel => mapServiceOrder(request));

export default mapServiceOrders;
