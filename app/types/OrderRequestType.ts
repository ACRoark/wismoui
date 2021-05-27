export const OrderRequestTypes = ['MIMO_START', 'MIMO_STOP'] as const;

type OrderRequestType = typeof OrderRequestTypes[number];

export default OrderRequestType;
