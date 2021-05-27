import { IOrderRequest, ISchedulingMomentViewModel } from 'types';

import parse from '../parsers';

import findOrderRequestStatusUpdates from './helpers/findOrderRequestStatusUpdate';
import mapServiceAppointments from './mapServiceAppointments';

const mapSchedulingMoment = (orderRequest: IOrderRequest): ISchedulingMomentViewModel => {
  const scheduledEvent = findOrderRequestStatusUpdates(orderRequest, 'SCHEDULED');

  if (scheduledEvent) {
    return {
      appointments: mapServiceAppointments(orderRequest.serviceOrderEvents),
      currentStatus: 'COMPLETED', // Separate status per appointment?
      hasError: false,
      history: [],
      schedulingCompletedOn: parse.dateTime(scheduledEvent.createdAtDate, scheduledEvent.createdAtTime),
    };
  }

  return {
    appointments: [],
    currentStatus: 'PENDING',
    hasError: false,
    history: [],
    schedulingCompletedOn: null,
  };
};

export default mapSchedulingMoment;
