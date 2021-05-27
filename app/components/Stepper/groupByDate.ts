import { IServiceOrderEvent } from 'types';

import * as _ from 'lodash';

const groupByDate = (serviceOrderEvents: IServiceOrderEvent[]): IServiceOrderEvent[][] =>
  Object.values(_.groupBy(serviceOrderEvents, 'appointment.date'));

export default groupByDate;
