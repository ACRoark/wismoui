import { IClosedDetails, OrderRequestStatus } from 'types';
import showConfirmationView from '../showConfirmationView';

describe('showConfirmationView', (): void => {
  const bug2263Flags: boolean[] = [false, true];
  const closedOrderDetails: IClosedDetails[] = [
    {
      closedAt: '2020-08-27T19:35:06.0122303Z',
      reason: 'ABANDONED',
    },
    {
      closedAt: '2020-08-27T19:35:06.0122303Z',
      reason: 'CANCELED',
    },
    {
      closedAt: '2020-08-27T19:35:06.0122303Z',
      reason: 'FULFILLED',
    },
  ];
  const mostRecentOrderStatuses: OrderRequestStatus[] = ['AWAITING_BILLING', 'COMPLETED'];

  bug2263Flags.forEach((bug2263: boolean): void => {
    closedOrderDetails.forEach((closedDetails: IClosedDetails): void => {
      it(`should return true when order is closed due to ${closedDetails.reason} and most recent order status is NOT Awaiting Billing or Completed and bug2263 flag is ${bug2263}`, (): void => {
        const lastOrderRequestStatus = 'REQUESTED';

        expect(showConfirmationView(closedDetails, lastOrderRequestStatus, bug2263)).toBe(true);
      });

    });

    mostRecentOrderStatuses.forEach((mostRecentOrderStatus: OrderRequestStatus): void => {
      // tslint:disable-next-line: max-line-length
      it(`should return true when the most recent order status is ${mostRecentOrderStatus}, the order is not closed and bug2263 flag is ${bug2263}`, (): void => {
        const closedDetails = null;

        expect(showConfirmationView(closedDetails, mostRecentOrderStatus, bug2263)).toBe(true);
      });
    });
  });

  it('should return false when the order is closed due to BPEM and bug2263 is true', (): void => {
    const bug2263 = true;
    const closedDetails: IClosedDetails = {
      closedAt: '2020-08-27T19:35:06.0122303Z',
      reason: 'BPEM_CLOSED',
    };
    const lastOrderRequestStatus: OrderRequestStatus = 'REQUESTED';

    expect(showConfirmationView(closedDetails, lastOrderRequestStatus, bug2263)).toBe(false);
  });

  it('should return true when the order is closed due to BPEM and bug2263 is false', (): void => {
    const bug2263 = false;
    const closedDetails: IClosedDetails = {
      closedAt: '2020-08-27T19:35:06.0122303Z',
      reason: 'BPEM_CLOSED',
    };
    const lastOrderRequestStatus: OrderRequestStatus = 'REQUESTED';

    expect(showConfirmationView(closedDetails, lastOrderRequestStatus, bug2263)).toBe(true);
  });
});
