import { IOrderRequestStatusUpdate } from 'types';

import filterDuplicateStatusUpdates from '../filterDuplicateStatusUpdates';

describe('filterDuplicateStatusUpdates', (): void => {
  it('should return the last duplicate status update when given multiples of the same status update', (): void => {
    const orderRequestStatusUpdates: IOrderRequestStatusUpdate[] = [
      {
        createdAtDate: '20200708',
        createdAtTime: '143614',
        orderRequestStatus: 'PROCESSED',
      },
      {
        createdAtDate: '20200708',
        createdAtTime: '143615',
        orderRequestStatus: 'SCHEDULED',
      },
      {
        createdAtDate: '20200708',
        createdAtTime: '143618',
        orderRequestStatus: 'SCHEDULED',
      },
    ];

    const expected: IOrderRequestStatusUpdate[] = [
      {
        createdAtDate: '20200708',
        createdAtTime: '143614',
        orderRequestStatus: 'PROCESSED',
      },
      {
        createdAtDate: '20200708',
        createdAtTime: '143618',
        orderRequestStatus: 'SCHEDULED',
      },
    ];

    expect(filterDuplicateStatusUpdates(orderRequestStatusUpdates)).toEqual(expected);
  });
});
