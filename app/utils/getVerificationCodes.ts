import IVerificationEvent from '../types/IVerificationEvent';

const getVerificationCodes = (verificationEvents: IVerificationEvent[]): string[] =>
  // tslint:disable-next-line: typedef
  verificationEvents[0].verificationEventStatusUpdates.map((update) => update.verificationCode);

export default getVerificationCodes;
