export const OrderRequestStatuses = [
  'AWAITING_BILLING',
  'CANCELED',
  'COMPLETED',
  'NEEDS_VERIFICATION',
  'PROCESSED',
  'REQUESTED',
  'SCHEDULED',
] as const;

type OrderRequestStatus = typeof OrderRequestStatuses[number];

export default OrderRequestStatus;
