import * as _ from 'lodash';
import { IAppointmentList, IOrderRequest, IServiceOrderEvent } from 'types';
import sortByCreatedAtDateAndTime from 'utils/sortByCreatedAtDateAndTime';
import filterActiveServiceOrders from './filterActiveServiceOrders';
import filterByMostRecentProducts from './filterByMostRecentProducts';
import groupByDate from './groupByDate';
import sortByAppointmentDate from './sortByAppointmentDate';
import sortByAppointmentTime from './sortByAppointmentTime';
import updateServiceOrdersDate from './updateServiceOrdersDate';

const createAppointmentList = (serviceRequest: IOrderRequest): IAppointmentList[] => {
  const { products, serviceOrderEvents } = serviceRequest;

  const activeServiceOrders: IServiceOrderEvent[] = filterActiveServiceOrders(products, serviceOrderEvents);

  const updatedServiceOrders: IServiceOrderEvent[] = updateServiceOrdersDate(products, activeServiceOrders);

  const sortedServiceOrderEvents: IServiceOrderEvent[] = _.flow([
    sortByCreatedAtDateAndTime,
    filterByMostRecentProducts,
    sortByAppointmentDate,
    sortByAppointmentTime,
  ])(updatedServiceOrders);

  const inProgressServiceOrders: IServiceOrderEvent[] = sortedServiceOrderEvents.filter(
    (serviceOrderEvent: IServiceOrderEvent): boolean =>
      serviceOrderEvent.latestStatus.serviceOrderEventStatus !== 'COMPLETED',
  );

  const completedServiceOrders: IServiceOrderEvent[] = sortedServiceOrderEvents.filter(
    (serviceOrderEvent: IServiceOrderEvent): boolean =>
      serviceOrderEvent.latestStatus.serviceOrderEventStatus === 'COMPLETED',
  );

  const serviceOrderEventsByDate = groupByDate(inProgressServiceOrders);

  const completedFirstServiceOrders = completedServiceOrders.length
    ? [completedServiceOrders, ...serviceOrderEventsByDate]
    : serviceOrderEventsByDate;

  const showEditLink: boolean = serviceOrderEventsByDate.length === 1;

  const appointmentList: IAppointmentList[] = completedFirstServiceOrders.map(
    (appointments: IServiceOrderEvent[]): IAppointmentList => ({
      appointments,
      completed: appointments[0].latestStatus.serviceOrderEventStatus === 'COMPLETED',
      date: appointments[0].appointment.date,
      key: appointments[0].product,
      showEditLink,
    }),
  );

  return appointmentList;
};

export default createAppointmentList;
