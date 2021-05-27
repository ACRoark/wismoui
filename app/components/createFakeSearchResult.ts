import * as _ from 'lodash';
import { IOrderRequest, IOrderSearchResult } from 'types';
import IOrderRequestInfo from 'types/IOrderRequestInfo';

import sortOrderRequestUpdates from 'utils/sortOrderRequestUpdates';
import createFakeOrder from './createFakeOrder';

const createFakeSearchResult = (orderNumber: string): IOrderSearchResult => {
  const order = createFakeOrder(orderNumber);

  return {
    closedDetails: order.closedDetails,
    createdAt: order.createdAt,
    createdBy: order.createdBy,
    customer: order.customer,
    orderNumber,
    orderRequests: order.orderRequests.map(
      (request: IOrderRequest): IOrderRequestInfo => ({
        accountNumber: request.accountNumber,
        address: request.address,
        currentOrderRequestStatus: _.last(sortOrderRequestUpdates(request.orderRequestStatusUpdates)),
        orderRequestType: request.orderRequestType,
        premiseId: request.premiseId,
        products: request.products,
        verificationEvents: [],
        wantDate: request.wantDate,
      }),
    ),
    orderType: order.orderType,
  };
};

export default createFakeSearchResult;
