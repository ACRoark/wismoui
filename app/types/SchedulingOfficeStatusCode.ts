const SchedulingOfficeStatusCodes = ['AP', 'PM', 'WP'] as const;

type SchedulingOfficeStatusCode = typeof SchedulingOfficeStatusCodes[number];

export { SchedulingOfficeStatusCode, SchedulingOfficeStatusCodes };
