const ServiceOrderTypes = ['MIMO_START', 'MIMO_STOP'] as const;

type ServiceOrderType = typeof ServiceOrderTypes[number];

export { ServiceOrderType, ServiceOrderTypes };
