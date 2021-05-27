const SchedulingErrorCodes = ['R975', 'R980', 'R981', 'R982', 'R983', 'R984', 'R985'] as const;

type SchedulingErrorCode = typeof SchedulingErrorCodes[number];

export { SchedulingErrorCode, SchedulingErrorCodes };
