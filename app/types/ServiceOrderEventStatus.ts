const ServiceOrderEventStatuses = [
  'CALL_DTE',
  'CANCELED',
  'CANCELED_CGI',
  'CANCELED_INC',
  'COMPLETED',
  'DELAYED',
  'ON_SCHEDULE',
  'PARTIAL_COMPLETION',
  'RESCHEDULED',
  'SCHEDULED_TODAY',
] as const;

type ServiceOrderEventStatus = typeof ServiceOrderEventStatuses[number];

export { ServiceOrderEventStatus, ServiceOrderEventStatuses };
