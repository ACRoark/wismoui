import { IOrder, IOrderViewModel } from 'types';

import mapServiceOrders from './mapServiceOrders';

import parse from '../parsers';

const mapOrder = (order: IOrder): IOrderViewModel => ({
  orderNumber: parse.orderNumber(order.orderNumber),
  orderType: order.orderType,
  serviceOrders: mapServiceOrders(order.orderRequests),
});

export default mapOrder;
