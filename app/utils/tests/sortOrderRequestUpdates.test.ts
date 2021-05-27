import IOrderRequestStatusUpdate from 'types/IOrderRequestStatusUpdate';

import sortOrderRequestUpdates from '../sortOrderRequestUpdates';

describe('sortOrderRequestUpdates', (): void => {
  it('should return a new array sorted by the createdAt date in ascending order', (): void => {
    const orderRequestStatusUpdates: IOrderRequestStatusUpdate[] = [
      {
        createdAtDate: '20200321',
        createdAtTime: '223443',
        'orderRequestStatus': 'SCHEDULED',
      },
      {
        createdAtDate: '20200320',
        createdAtTime: '092215',
        'orderRequestStatus': 'PROCESSED',
      },
      {
        createdAtDate: '20200319',
        createdAtTime: '131530',
        'orderRequestStatus': 'REQUESTED',
      },
    ];

    expect(sortOrderRequestUpdates(orderRequestStatusUpdates)).toEqual([
      {
        createdAtDate: '20200319',
        createdAtTime: '131530',
        'orderRequestStatus': 'REQUESTED',
      },
      {
        createdAtDate: '20200320',
        createdAtTime: '092215',
        'orderRequestStatus': 'PROCESSED',
      },
      {
        createdAtDate: '20200321',
        createdAtTime: '223443',
        'orderRequestStatus': 'SCHEDULED',
      },
    ]);
  });
});
