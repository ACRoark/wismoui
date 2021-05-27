const VerificationErrorCodes = ['R975', 'R980', 'R981', 'R982', 'R983', 'R986', 'R987'] as const;

type VerificationErrorCode = typeof VerificationErrorCodes[number];

export { VerificationErrorCode, VerificationErrorCodes };
