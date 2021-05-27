import { IClosedDetails, OrderRequestStatus } from 'types';

const showConfirmationView = (
  closedDetails: IClosedDetails | null,
  lastOrderRequestStatus: OrderRequestStatus | string,
  bug2263?: boolean,
): boolean => {
  if (bug2263) {
    return (
      (closedDetails && closedDetails.reason !== 'BPEM_CLOSED') ||
      ['AWAITING_BILLING', 'COMPLETED'].includes(lastOrderRequestStatus)
    );
  }

  return !!closedDetails || ['AWAITING_BILLING', 'COMPLETED'].includes(lastOrderRequestStatus);
};

export default showConfirmationView;
