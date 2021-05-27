const VerificationOfficeStatusCodes = ['AD', 'AN', 'CL', 'DR', 'ES', 'FV', 'FW', 'LD', 'PR', 'RE', 'RF', 'SC'] as const;

type VerificationOfficeStatusCode = typeof VerificationOfficeStatusCodes[number];

export { VerificationOfficeStatusCode, VerificationOfficeStatusCodes };
