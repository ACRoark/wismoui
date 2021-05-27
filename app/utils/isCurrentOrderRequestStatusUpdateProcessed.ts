import * as _ from 'lodash';

import IOrderRequestStatusUpdate from 'types/IOrderRequestStatusUpdate';

import sortOrderRequestUpdates from './sortOrderRequestUpdates';

const isCurrentOrderRequestStatusUpdateProcessed = (statusUpdates: IOrderRequestStatusUpdate[]): boolean => {
  if (statusUpdates.length) {
    const sortedUpdates = sortOrderRequestUpdates(statusUpdates);
    const { orderRequestStatus } = _.last(sortedUpdates);

    return orderRequestStatus === 'PROCESSED';
  }

  return false;
};

export default isCurrentOrderRequestStatusUpdateProcessed;
