import { IOrderRequestStatusUpdate } from 'types';
import isCurrentOrderRequestStatusUpdateProcessed from '../isCurrentOrderRequestStatusUpdateProcessed';

describe('isCurrentOrderRequestStatusUpdateProcessed', (): void => {
  const emptyOrderRequestStatusUpdates = [];

  const processedOrderRequestStatusUpdates: IOrderRequestStatusUpdate[] = [
    {
      createdAtDate: '20200519',
      createdAtTime: '131530',
      orderRequestStatus: 'REQUESTED',
    },
    {
      createdAtDate: '20200520',
      createdAtTime: '092215',
      orderRequestStatus: 'PROCESSED',
    },
  ];

  it('should return false when there are no order request statuses', (): void => {
    expect(isCurrentOrderRequestStatusUpdateProcessed(emptyOrderRequestStatusUpdates));
  });

  it('should return true when the latest order request status is processed', (): void => {
    expect(isCurrentOrderRequestStatusUpdateProcessed(processedOrderRequestStatusUpdates));
  });
});
