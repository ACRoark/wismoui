import { IOrderRequestStatusUpdate } from 'types';

const forRequestedOrder: IOrderRequestStatusUpdate[] = [
  {
    createdAtDate: '20200601',
    createdAtTime: '12:00:00',
    orderRequestStatus: 'REQUESTED',
  },
];

const forNeedsVerificationOrder: IOrderRequestStatusUpdate[] = [
  ...forRequestedOrder,
  {
    createdAtDate: '20200602',
    createdAtTime: '12:00:00',
    orderRequestStatus: 'NEEDS_VERIFICATION',
  },
];

const forProcessedOrder: IOrderRequestStatusUpdate[] = [
  ...forNeedsVerificationOrder,
  {
    createdAtDate: '20200603',
    createdAtTime: '12:00:00',
    orderRequestStatus: 'PROCESSED',
  },
];

const forScheduledOrder: IOrderRequestStatusUpdate[] = [
  ...forProcessedOrder,
  {
    createdAtDate: '20200604',
    createdAtTime: '12:00:00',
    orderRequestStatus: 'SCHEDULED',
  },
];

const forAwaitingBillingOrder: IOrderRequestStatusUpdate[] = [
  ...forScheduledOrder,
  {
    createdAtDate: '20200605',
    createdAtTime: '12:00:00',
    orderRequestStatus: 'AWAITING_BILLING',
  },
];

const forCompletedOrder: IOrderRequestStatusUpdate[] = [
  ...forAwaitingBillingOrder,
  {
    createdAtDate: '20200606',
    createdAtTime: '12:00:00',
    orderRequestStatus: 'COMPLETED',
  },
];

const statusUpdates = {
  forAwaitingBillingOrder,
  forCompletedOrder,
  forNeedsVerificationOrder,
  forProcessedOrder,
  forRequestedOrder,
  forScheduledOrder,
};

export default statusUpdates;
