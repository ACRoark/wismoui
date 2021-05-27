const VerificationMomentStatuses = ['ACTIVE', 'CANCELED', 'COMPLETED', 'PENDING'] as const;

type VerificationMomentStatus = typeof VerificationMomentStatuses[number];

export { VerificationMomentStatus, VerificationMomentStatuses };
