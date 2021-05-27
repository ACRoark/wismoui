import { IOrderRequestStatusUpdate } from 'types';
import getLastOrderRequestStatus from '../getLastOrderRequestStatus';

describe('getLastOrderRequestStatus', (): void => {
  const emptyOrderRequestStatusUpdates = [];
  const orderRequestStatusUpdates: IOrderRequestStatusUpdate[] = [
    {
      createdAtDate: '20200519',
      createdAtTime: '131530',
      orderRequestStatus: 'REQUESTED',
    },
    {
      createdAtDate: '20200519',
      createdAtTime: '161530',
      orderRequestStatus: 'NEEDS_VERIFICATION',
    },
  ];

  it('should return empty string when there are no order request status updates', (): void => {
    expect(getLastOrderRequestStatus(emptyOrderRequestStatusUpdates)).toBe('');
  });

  it('should return the last order request status when there are order request status updates', (): void => {
    expect(getLastOrderRequestStatus(orderRequestStatusUpdates)).toBe('NEEDS_VERIFICATION');
  });
});
