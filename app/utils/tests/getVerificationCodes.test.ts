import { IVerificationEvent } from '../../types';

import getVerificationCodes from '../getVerificationCodes';

const verificationEventsWithMultipleUpdates: IVerificationEvent[] = [{
  verificationCategory: 'R975',
  verificationEventId: '123123',
  verificationEventStatusUpdates: [
    {
      verificationCode: 'AP',
      verificationEventStatus: 'ACTIVE',
      createdAtDate: '20200320',
      createdAtTime: '092215',
    },
    {
      verificationCode: 'DR',
      verificationEventStatus: 'ACTIVE',
      createdAtDate: '20200320',
      createdAtTime: '092215',
    },
    {
      verificationCode: 'LD',
      verificationEventStatus: 'ACTIVE',
      createdAtDate: '20200320',
      createdAtTime: '092215',
    }],
}];

const codes = ['AP', 'DR', 'LD'];

describe('getVerificationCodes', (): void => {
  it(`should return an array which contains all the verification codes when verification events is passed as an argument`, (): void => {

    expect(getVerificationCodes(verificationEventsWithMultipleUpdates)).toEqual(codes);
  });
});
