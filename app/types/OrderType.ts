export const OrderTypes = ['MIMO_START', 'MIMO_STOP', 'MIMO_TRANSFER'] as const;

type OrderType = typeof OrderTypes[number];

export default OrderType;
