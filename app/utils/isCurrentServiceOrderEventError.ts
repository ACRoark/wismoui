import * as _ from 'lodash';

import IServiceOrderEvent from 'types/IServiceOrderEvent';
import sortByCreatedAtDateAndTime from './sortByCreatedAtDateAndTime';

const isCurrentServiceOrderEventError = (serviceOrderEvents: IServiceOrderEvent[]): boolean => {
  const sortedServiceOrderEvents = sortByCreatedAtDateAndTime(serviceOrderEvents);
  if (sortedServiceOrderEvents.length) {
    return ['CALL_DTE', 'DELAYED', 'RESCHEDULED', 'PARTIAL_COMPLETION'].includes(
      _.last(sortedServiceOrderEvents).latestStatus.serviceOrderEventStatus,
    );
  }

  return false;
};

export default isCurrentServiceOrderEventError;
