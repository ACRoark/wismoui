import * as _ from 'lodash';
import IVerificationEventStatusUpdate from '../types/IVerificationEventStatusUpdate';

const filterVerificationEventStatusUpdatesByVerificationCodes = (
  verificationEventStatusUpdates: IVerificationEventStatusUpdate[],
  verificationCodes: string[]): IVerificationEventStatusUpdate[] => {
  const filteredVerificationEventStatusUpdates: IVerificationEventStatusUpdate[] =
    _.filter(verificationEventStatusUpdates, update => verificationCodes.includes(update.verificationCode));

  return filteredVerificationEventStatusUpdates;
};

export default filterVerificationEventStatusUpdatesByVerificationCodes;
