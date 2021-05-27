import { ICompletedMomentViewModel, IOrderRequest } from 'types';

import parse from '../parsers';

import findOrderRequestStatusUpdates from './helpers/findOrderRequestStatusUpdate';

const mapCompletedMoment = (orderRequest: IOrderRequest): ICompletedMomentViewModel => {
  const awaitingBillingEvent = findOrderRequestStatusUpdates(orderRequest, 'AWAITING_BILLING');

  const completedEvent = findOrderRequestStatusUpdates(orderRequest, 'COMPLETED');

  return {
    hasBillingInformation: !!completedEvent,
    serviceCompletedOn: awaitingBillingEvent
      ? parse.dateTime(awaitingBillingEvent.createdAtDate, awaitingBillingEvent.createdAtTime)
      : null,
  };
};

export default mapCompletedMoment;
