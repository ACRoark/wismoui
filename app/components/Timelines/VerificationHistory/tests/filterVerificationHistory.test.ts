import filterVerificationHistory from 'components/Timelines/VerificationHistory/filterVerificationHistory';

import IVerificationEventStatusUpdate from 'types/IVerificationEventStatusUpdate';

describe('getVerificationHistory', (): void => {
  it(`should return a new array with only items in the 'COMPLETED' status when passed an array of mixed status items`, (): void => {
    const verificationEventStatusUpdates: IVerificationEventStatusUpdate[] = [
      {
        verificationCode: 'AD',
        verificationEventStatus: 'ACTIVE',
        createdAtDate: '20200520',
        createdAtTime: '092215',
      },
      {
        verificationCode: 'AD',
        verificationEventStatus: 'COMPLETED',
        createdAtDate: '20200521',
        createdAtTime: '092215',
      },
      {
        verificationCode: 'PR',
        verificationEventStatus: 'ACTIVE',
        createdAtDate: '20200521',
        createdAtTime: '112215',
      },
      {
        verificationCode: 'PR',
        verificationEventStatus: 'COMPLETED',
        createdAtDate: '20200521',
        createdAtTime: '122215',
      },
      {
        verificationCode: 'DR',
        verificationEventStatus: 'ACTIVE',
        createdAtDate: '20200522',
        createdAtTime: '092215',
      },
      {
        verificationCode: 'DR',
        verificationEventStatus: 'COMPLETED',
        createdAtDate: '20200522',
        createdAtTime: '123015',
      },
      {
        verificationCode: 'PR',
        verificationEventStatus: 'ACTIVE',
        createdAtDate: '20200523',
        createdAtTime: '092215',
      },
      {
        verificationCode: 'PR',
        verificationEventStatus: 'COMPLETED',
        createdAtDate: '20200523',
        createdAtTime: '132215',
      },
    ];

    expect(filterVerificationHistory(verificationEventStatusUpdates)).toEqual([
      {
        verificationCode: 'AD',
        verificationEventStatus: 'COMPLETED',
        createdAtDate: '20200521',
        createdAtTime: '092215',
      },
      {
        verificationCode: 'PR',
        verificationEventStatus: 'COMPLETED',
        createdAtDate: '20200521',
        createdAtTime: '122215',
      },
      {
        verificationCode: 'DR',
        verificationEventStatus: 'COMPLETED',
        createdAtDate: '20200522',
        createdAtTime: '123015',
      },
      {
        verificationCode: 'PR',
        verificationEventStatus: 'COMPLETED',
        createdAtDate: '20200523',
        createdAtTime: '132215',
      },
    ]);
  });
  it(`should return a new array ending with an 'ACTIVE' status when passed an array of mixed status items that ends in an 'ACTIVE' status`, (): void => {
    const verificationEventStatusUpdates: IVerificationEventStatusUpdate[] = [
      {
        verificationCode: 'AD',
        verificationEventStatus: 'ACTIVE',
        createdAtDate: '20200520',
        createdAtTime: '092215',
      },
      {
        verificationCode: 'AD',
        verificationEventStatus: 'COMPLETED',
        createdAtDate: '20200521',
        createdAtTime: '092215',
      },
      {
        verificationCode: 'PR',
        verificationEventStatus: 'ACTIVE',
        createdAtDate: '20200521',
        createdAtTime: '112215',
      },
      {
        verificationCode: 'PR',
        verificationEventStatus: 'COMPLETED',
        createdAtDate: '20200521',
        createdAtTime: '122215',
      },
      {
        verificationCode: 'DR',
        verificationEventStatus: 'ACTIVE',
        createdAtDate: '20200522',
        createdAtTime: '092215',
      },
      {
        verificationCode: 'DR',
        verificationEventStatus: 'COMPLETED',
        createdAtDate: '20200522',
        createdAtTime: '123015',
      },
      {
        verificationCode: 'PR',
        verificationEventStatus: 'ACTIVE',
        createdAtDate: '20200523',
        createdAtTime: '102215',
      },
    ];

    expect(filterVerificationHistory(verificationEventStatusUpdates)).toEqual([
      {
        verificationCode: 'AD',
        verificationEventStatus: 'COMPLETED',
        createdAtDate: '20200521',
        createdAtTime: '092215',
      },
      {
        verificationCode: 'PR',
        verificationEventStatus: 'COMPLETED',
        createdAtDate: '20200521',
        createdAtTime: '122215',
      },
      {
        verificationCode: 'DR',
        verificationEventStatus: 'COMPLETED',
        createdAtDate: '20200522',
        createdAtTime: '123015',
      },
      {
        verificationCode: 'PR',
        verificationEventStatus: 'ACTIVE',
        createdAtDate: '20200523',
        createdAtTime: '102215',
      },
    ]);
  });
});
