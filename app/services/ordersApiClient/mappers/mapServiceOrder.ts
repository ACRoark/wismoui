import { IOrderRequest, IServiceOrderViewModel } from 'types';

import mapAddress from './mapAddress';
import mapMoments from './mapMoments';
import mapServiceDate from './mapServiceDate';
import mapServices from './mapServices';

import parse from '../parsers';

const mapServiceOrder = (orderRequest: IOrderRequest): IServiceOrderViewModel =>
  // TODO: Sort the events arrays?

  ({
    address: mapAddress(orderRequest.address),
    contactPhoneNumber: parse.phoneNumber(orderRequest.contactPhoneNumber),
    moments: mapMoments(orderRequest),
    serviceDate: mapServiceDate(orderRequest),
    serviceOrderType: orderRequest.orderRequestType,
    services: mapServices(orderRequest.products),
  });
export default mapServiceOrder;
