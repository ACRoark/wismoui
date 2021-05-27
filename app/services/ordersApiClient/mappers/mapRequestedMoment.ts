import { DateTime, IOrderRequest, IRequestedMomentViewModel } from 'types';

import parse from '../parsers';

import findOrderRequestStatusUpdates from './helpers/findOrderRequestStatusUpdate';

const mapRequestedMoment = (orderRequest: IOrderRequest): IRequestedMomentViewModel => {
  const createdEvent = findOrderRequestStatusUpdates(orderRequest, 'REQUESTED');

  if (createdEvent) {
    return {
      occurredOn: parse.dateTime(createdEvent.createdAtDate, createdEvent.createdAtTime),
    };
  }

  // TODO: This should never be possible, but we should handle if it is.
  return {
    occurredOn: new DateTime('', ''),
  };
};

export default mapRequestedMoment;
