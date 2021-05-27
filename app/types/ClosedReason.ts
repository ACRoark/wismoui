export const ClosedReasons = ['ABANDONED', 'BPEM_CLOSED', 'CANCELED', 'FULFILLED', null] as const;

type ClosedReason = typeof ClosedReasons[number];

export default ClosedReason;
