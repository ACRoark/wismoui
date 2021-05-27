import IVerificationEvent from 'types/IVerificationEvent';
import verificationEventsHasVerificationCodes from '../verificationEventsHasVerificationCodes';

const verificationStepCodes: string[] = ['AD', 'AN', 'CL', 'DR', 'ES', 'FV', 'FW', 'LD', 'PR', 'RE', 'RF', 'SC'];
const scheduledStepCodes: string[] = ['AP', 'PM', 'WP'];
const verificationEvents: IVerificationEvent[] = [
  {
    verificationCategory: 'R975',
    verificationEventId: '123111',
    verificationEventStatusUpdates: [
      {
        createdAtDate: '10052020',
        createdAtTime: '091510',
        verificationCode: 'AD',
        verificationEventStatus: 'COMPLETED',
      }
    ]
  },
  {
    verificationCategory: 'R980',
    verificationEventId: '123111',
    verificationEventStatusUpdates: [
      {
        createdAtDate: '10052020',
        createdAtTime: '091510',
        verificationCode: 'DR',
        verificationEventStatus: 'ACTIVE',
      }
    ]
  },
];

describe('verificationEventsHasVerificationCodes', (): void => {
  it('should return true when the verificationCodes array has codes that match any of the verificationCodes inside the verificationEvents array', (): void => {
    expect(verificationEventsHasVerificationCodes(verificationEvents, verificationStepCodes)).toBeTruthy();
  });

  it('should return false when the list of verificationCodes does not match any of the verificationCodes inside the verificationEvents array', (): void => {
    expect(verificationEventsHasVerificationCodes(verificationEvents, scheduledStepCodes)).toBeFalsy();
  });
});
