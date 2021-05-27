import { IProduct, IServiceOrderEvent } from 'types';

import getActiveProduct from './getActiveProduct';

const updateServiceOrderDate = (products: IProduct[], serviceOrderEvents: IServiceOrderEvent[]): IServiceOrderEvent[] =>
  serviceOrderEvents.map(
    (serviceOrder: IServiceOrderEvent): IServiceOrderEvent => {
      const serviceDate =
        (serviceOrder.latestStatus.serviceOrderEventStatus === 'CANCELED' &&
          getActiveProduct(serviceOrder.product, products)?.serviceDate) ||
        serviceOrder.appointment.date;

      return {
        ...serviceOrder,
        appointment: {
          ...serviceOrder.appointment,
          date: serviceDate,
        },
      };
    },
  );

export default updateServiceOrderDate;
