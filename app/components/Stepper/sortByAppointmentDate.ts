import moment from 'moment';

import { IServiceOrderEvent } from 'types';

const sortByAppointmentDate = (serviceOrderEvents: IServiceOrderEvent[]): IServiceOrderEvent[] =>
  serviceOrderEvents.sort(
    (a: IServiceOrderEvent, b: IServiceOrderEvent): number =>
      moment(a.appointment.date).unix() - moment(b.appointment.date).unix(),
  );

export default sortByAppointmentDate;
