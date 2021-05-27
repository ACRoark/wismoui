import IVerificationEventStatusUpdate from '../../types/IVerificationEventStatusUpdate';
import filterVerificationEventStatusUpdatesByActive from '../filterVerificationEventStatusUpdatesByActive';

const mixedVerificationEventStatusUpdates: IVerificationEventStatusUpdate[] = [
  {
    createdAtDate: '10012020',
    createdAtTime: '092215',
    verificationCode: 'AD',
    verificationEventStatus: 'ACTIVE'
  },
  {
    createdAtDate: '10012020',
    createdAtTime: '092215',
    verificationCode: 'DR',
    verificationEventStatus: 'CANCELED'
  }
];

const verificationEventStatusUpdatesWithResolvedSteps: IVerificationEventStatusUpdate[] = [
  {
    createdAtDate: '10012020',
    createdAtTime: '092215',
    verificationCode: 'AD',
    verificationEventStatus: 'ACTIVE'
  },
  {
    createdAtDate: '10012020',
    createdAtTime: '092215',
    verificationCode: 'AD',
    verificationEventStatus: 'COMPLETED'
  },
  {
    createdAtDate: '10012020',
    createdAtTime: '092615',
    verificationCode: 'DR',
    verificationEventStatus: 'ACTIVE'
  }
];

const verificationEventStatusUpdatesWithResolvedStepsFiltered: IVerificationEventStatusUpdate[] = [
  {
    createdAtDate: '10012020',
    createdAtTime: '092615',
    verificationCode: 'DR',
    verificationEventStatus: 'ACTIVE'
  }
];

describe('filterVerificationEventStatusUpdatesByActive', (): void => {
  it('should return an empty array when the last status in the verificationEventsStatusUpdates array is not an ACTIVE status', (): void => {
    expect(filterVerificationEventStatusUpdatesByActive(mixedVerificationEventStatusUpdates)).toEqual([]);
  });

  // tslint:disable-next-line:max-line-length
  it('should return an array of verificationEventStatusUpdates with one status update when the last status update is ACTIVE', (): void => {
    expect(filterVerificationEventStatusUpdatesByActive(verificationEventStatusUpdatesWithResolvedSteps))
      .toEqual(verificationEventStatusUpdatesWithResolvedStepsFiltered);
  });
});
