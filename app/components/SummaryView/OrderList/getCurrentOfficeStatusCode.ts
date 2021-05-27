import * as _ from 'lodash';
import { IVerificationEventInfo } from 'types';

const getCurrentOfficeStatusCode = (verificationEvents: IVerificationEventInfo[]): string | null => {
  if (verificationEvents?.length) {
    const { latestVerificationEventStatusUpdate } = _.last(verificationEvents);

    const { verificationCode } = latestVerificationEventStatusUpdate;

    return verificationCode;
  }

  return null;
};

export default getCurrentOfficeStatusCode;
