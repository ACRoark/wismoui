import moment from 'moment';

import IServiceOrderEvent from 'types/IServiceOrderEvent';

const sortByCreatedAtDateAndTime = (serviceOrderEvent: IServiceOrderEvent[]): IServiceOrderEvent[] =>
  serviceOrderEvent.sort(
    (a: IServiceOrderEvent, b: IServiceOrderEvent): number =>
      moment(`${a.latestStatus.createdAtDate}T${a.latestStatus.createdAtTime}`).unix() -
      moment(`${b.latestStatus.createdAtDate}T${b.latestStatus.createdAtTime}`).unix(),
  );

export default sortByCreatedAtDateAndTime;
