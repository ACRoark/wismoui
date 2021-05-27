import IVerificationEvent from 'types/IVerificationEvent';
import filterVerificationEvents from 'utils/filterVerificationEvents';

const filteredVerificationEvents: IVerificationEvent[] = [
  {
    verificationCategory: 'R980',
    verificationEventId: '123124',
    verificationEventStatusUpdates: [
      {
        createdAtDate: '10022020',
        createdAtTime: '092215',
        verificationCode: 'AD',
        verificationEventStatus: 'ACTIVE',
      }
    ]
  },
];

const unfilteredVerificationEvents: IVerificationEvent[] = [
  {
    verificationCategory: 'R975',
    verificationEventId: '123123',
    verificationEventStatusUpdates: [
      {
        createdAtDate: '10022020',
        createdAtTime: '092215',
        verificationCode: 'SC',
        verificationEventStatus: 'ACTIVE',
      },
      {
        createdAtDate: '10022020',
        createdAtTime: '092215',
        verificationCode: 'SC',
        verificationEventStatus: 'COMPLETED',
      },
      {
        createdAtDate: '10022020',
        createdAtTime: '092215',
        verificationCode: 'WP',
        verificationEventStatus: 'ACTIVE',
      }
    ]
  },
  {
    verificationCategory: 'R980',
    verificationEventId: '123124',
    verificationEventStatusUpdates: [
      {
        createdAtDate: '10022020',
        createdAtTime: '092215',
        verificationCode: 'AD',
        verificationEventStatus: 'ACTIVE',
      },
    ]
  },
  {
    verificationCategory: 'R981',
    verificationEventId: '123125',
    verificationEventStatusUpdates: [
      {
        createdAtDate: '10022020',
        createdAtTime: '092215',
        verificationCode: 'AP',
        verificationEventStatus: 'ACTIVE',
      },
      {
        createdAtDate: '10022020',
        createdAtTime: '092215',
        verificationCode: 'PM',
        verificationEventStatus: 'COMPLETED',
      }
    ]
  },
];

const desiredVerificationCodes: string[] = ['AD', 'PR', 'DR', 'ES', 'RF', 'AN', 'SC'];

describe('filterVerificationEventStatusUpdatesByActive', (): void => {
  it('should return a filtered array of verificationEvents where the verificationCodes are in the array of verificationCodes', (): void => {
    expect(filterVerificationEvents(unfilteredVerificationEvents, desiredVerificationCodes))
      .toEqual(filteredVerificationEvents);
  });
});
