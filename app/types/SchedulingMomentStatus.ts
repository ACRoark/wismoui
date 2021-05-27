const SchedulingMomentStatuses = [
  'CALL_DTE',
  'CANCELED',
  'CANCELED_CGI',
  'CANCELED_INC',
  'COMPLETED',
  'DELAYED',
  'ON_SCHEDULE',
  'PARTIAL_COMPLETION',
  'PENDING',
  'RESCHEDULED',
  'SCHEDULED_TODAY',
] as const;

type SchedulingMomentStatus = typeof SchedulingMomentStatuses[number];

export { SchedulingMomentStatus, SchedulingMomentStatuses };
