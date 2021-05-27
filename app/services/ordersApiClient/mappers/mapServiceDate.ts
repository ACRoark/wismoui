import moment from 'moment';

import { IOrderRequest, ServiceDate } from 'types';

const mapServiceDate = (orderRequest: IOrderRequest): ServiceDate => {
  // TODO: What is the correct service date when there are multiple appointments?
  const { products, serviceOrderEvents } = orderRequest;

  if (serviceOrderEvents && serviceOrderEvents[0] && serviceOrderEvents[0].appointment) {
    return moment(serviceOrderEvents[0].appointment.date, 'YYYYMMDD').toDate();
  } else {
    if (products.length) {
      return moment(products[0].serviceDate, 'YYYYMMDD').toDate();
    }
  }

  return null;
};

export default mapServiceDate;
