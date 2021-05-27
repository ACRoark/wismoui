import { IOrderRequest, IVerificationMomentViewModel } from 'types';

import parse from '../parsers';

import findOrderRequestStatusUpdates from './helpers/findOrderRequestStatusUpdate';

const mapVerificationMoment = (orderRequest: IOrderRequest): IVerificationMomentViewModel => {
  const processedEvent = findOrderRequestStatusUpdates(orderRequest, 'PROCESSED');

  if (processedEvent) {
    return {
      currentStatus: 'COMPLETED',
      hasError: false,
      history: [],
      verificationCompletedOn: parse.dateTime(processedEvent.createdAtDate, processedEvent.createdAtTime),
    };
  }

  return {
    currentStatus: 'PENDING',
    hasError: false,
    history: [],
    verificationCompletedOn: null,
  };
};

export default mapVerificationMoment;
