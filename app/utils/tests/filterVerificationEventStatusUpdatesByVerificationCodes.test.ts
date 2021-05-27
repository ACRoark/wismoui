import IVerificationEventStatusUpdate from 'types/IVerificationEventStatusUpdate';
import filterVerificationEventStatusUpdatesByVerificationCodes from '../filterVerificationEventStatusUpdatesByVerificationCodes';

const mixedVerificationEventStatusUpdates: IVerificationEventStatusUpdate[] = [
  {
    createdAtDate: '10012020',
    createdAtTime: '092215',
    verificationCode: 'AD',
    verificationEventStatus: 'ACTIVE',
  },
  {
    createdAtDate: '10012020',
    createdAtTime: '092215',
    verificationCode: 'WP',
    verificationEventStatus: 'ACTIVE',
  },
  {
    createdAtDate: '10012020',
    createdAtTime: '092215',
    verificationCode: 'SC',
    verificationEventStatus: 'ACTIVE',
  },
];

const matchingVerificationEventStatusUpdatesByVerificationCodes: IVerificationEventStatusUpdate[] = [
  {
    createdAtDate: '10012020',
    createdAtTime: '092215',
    verificationCode: 'AD',
    verificationEventStatus: 'ACTIVE',
  },
  {
    createdAtDate: '10012020',
    createdAtTime: '092215',
    verificationCode: 'SC',
    verificationEventStatus: 'ACTIVE',
  },
];
const verificationCodes: string[] = ['AD', 'PR', 'DR', 'ES', 'RF', 'AN', 'SC'];

describe('filterVerificationEventStatusUpdatesByVerificationCodes', (): void => {
  it('should return an array of verificationEventStatusUpdates where the verificationCodes are in the array of verificationCodes', (): void => {
    expect(filterVerificationEventStatusUpdatesByVerificationCodes(mixedVerificationEventStatusUpdates, verificationCodes))
      .toEqual(matchingVerificationEventStatusUpdatesByVerificationCodes);
  });
});
