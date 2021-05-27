import * as _ from 'lodash';
import { IOrderRequestStatusUpdate, OrderRequestStatus } from 'types';

const getLastOrderRequestStatus = (
  orderRequestStatusUpdates: IOrderRequestStatusUpdate[],
): OrderRequestStatus | string => {
  if (orderRequestStatusUpdates.length) {
    return _.last(orderRequestStatusUpdates).orderRequestStatus;
  }

  return '';
};

export default getLastOrderRequestStatus;
