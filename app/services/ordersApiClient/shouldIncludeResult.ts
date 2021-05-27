import moment from 'moment';

import { IClosedDetails, IOrderSearchResult } from 'types';

const bug2263Implementation = (closedDetails: IClosedDetails): boolean => {
  // If the order was bpem closed or canceled...
  if (closedDetails.reason === 'BPEM_CLOSED' || closedDetails.reason === 'CANCELED') {
    const closedAt = moment(closedDetails.closedAt);
    const today = moment();

    // ... we still show the order if it was bpem closed or canceled in the last 30 days
    if (closedAt.add(30, 'days').isAfter(today)) {
      return true;
    }
  }

  return false;
};

const shouldIncludeResult = (result: IOrderSearchResult, bug2263?: boolean): boolean => {
  const { closedDetails } = result;

  // The order is still active if 'closedDetails' is null/undefined
  if (closedDetails) {
    if (bug2263) {
      return bug2263Implementation(closedDetails);
    }
    // If the order was canceled...
    if (closedDetails.reason === 'CANCELED') {
      const canceledAt = moment(closedDetails.closedAt);
      const today = moment();

      // ... we still show the order if it was canceled in the last 30 days
      if (canceledAt.add(30, 'days').isAfter(today)) {
        return true;
      }
    }

    return false;
  }

  return true;
};

export default shouldIncludeResult;
