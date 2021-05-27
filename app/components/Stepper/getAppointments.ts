import { ReactElement } from 'react';

import { IServiceOrderEvent } from 'types';

import hideCanceledCGIServiceOrderEvent from './hideCanceledCGIServiceOrderEvent';
import mapAppointments from './mapAppointments';
import productHasMultipleServiceOrders from './productHasMultipleServiceOrders';

// TODO: deprecated function will be removed when us1599 flag is also removed
const getAppointments = (serviceOrderEvents: IServiceOrderEvent[], us3273?: boolean): ReactElement[] => {
  const canceledCGIServiceOrder = serviceOrderEvents.find(
    (serviceOrderEvent: IServiceOrderEvent): boolean =>
      serviceOrderEvent.latestStatus.serviceOrderEventStatus === 'CANCELED_CGI',
  );

  if (canceledCGIServiceOrder && productHasMultipleServiceOrders(canceledCGIServiceOrder.product, serviceOrderEvents)) {
    const serviceOrderEventsWithoutCGI = hideCanceledCGIServiceOrderEvent(serviceOrderEvents);

    return mapAppointments(serviceOrderEventsWithoutCGI, us3273);
  }

  return mapAppointments(serviceOrderEvents, us3273);
};

export default getAppointments;
