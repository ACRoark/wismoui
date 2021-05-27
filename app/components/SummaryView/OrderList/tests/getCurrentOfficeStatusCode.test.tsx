import { IVerificationEventInfo } from 'types';

import getCurrentOfficeStatusCode from '../getCurrentOfficeStatusCode';

describe('getCurrentOfficeStatusCode', (): void => {
  it('should return the code from the event when there is only one event', (): void => {
    const events: IVerificationEventInfo[] = [
      {
        latestVerificationEventStatusUpdate: {
          createdAtDate: '20200520',
          createdAtTime: '092215',
          verificationCode: 'AD',
          verificationEventStatus: 'ACTIVE',
        },
        verificationCategory: 'does not matter',
        verificationEventId: 'does not matter',
      },
    ];

    const result = getCurrentOfficeStatusCode(events);

    expect(result).toBe('AD');
  });

  it('should return the code from the most recent event when there are more than one events', (): void => {
    const events: IVerificationEventInfo[] = [
      {
        latestVerificationEventStatusUpdate: {
          createdAtDate: '20200520',
          createdAtTime: '092215',
          verificationCode: 'AD',
          verificationEventStatus: 'ACTIVE',
        },
        verificationCategory: 'does not matter',
        verificationEventId: 'does not matter',
      },
      {
        latestVerificationEventStatusUpdate: {
          createdAtDate: '20200521',
          createdAtTime: '092215',
          verificationCode: 'AP',
          verificationEventStatus: 'ACTIVE',
        },
        verificationCategory: 'does not matter',
        verificationEventId: 'does not matter',
      },
    ];

    const result = getCurrentOfficeStatusCode(events);

    expect(result).toBe('AP');
  });
});
