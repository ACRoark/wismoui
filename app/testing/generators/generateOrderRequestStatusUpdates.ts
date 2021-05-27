import { IOrderRequestStatusUpdate, OrderRequestStatus } from 'types';

import generateRandomNumber from './generateRandomNumber';

const orderedStatuses: OrderRequestStatus[] = [
  'REQUESTED',
  'NEEDS_VERIFICATION',
  'PROCESSED',
  'SCHEDULED',
  'AWAITING_BILLING',
  'COMPLETED',
];

const generateOrderRequestStatusUpdates = (): IOrderRequestStatusUpdate[] => {
  const count = generateRandomNumber(1, 6);

  const updates: IOrderRequestStatusUpdate[] = [];

  for (let i = 0; i < count; i++) {
    const update: IOrderRequestStatusUpdate = {
      createdAtDate: `2020060${i + 1}`,
      createdAtTime: '12:00:00',
      orderRequestStatus: orderedStatuses[i],
    };

    updates.push(update);
  }

  return updates;
};

export default generateOrderRequestStatusUpdates;
