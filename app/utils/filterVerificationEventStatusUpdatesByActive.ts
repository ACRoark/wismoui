import * as _ from 'lodash';
import IVerificationEventStatusUpdate from 'types/IVerificationEventStatusUpdate';
import sortVerificationEventStatusUpdates from './sortVerificationEventStatusUpdates';

const filterVerificationEventStatusUpdatesByActive = (
  verificationEventStatusUpdates: IVerificationEventStatusUpdate[],
): IVerificationEventStatusUpdate[] => {
  const statusUpdatesSortedByDate: IVerificationEventStatusUpdate[] = sortVerificationEventStatusUpdates(
    verificationEventStatusUpdates,
  );

  return (_.last(statusUpdatesSortedByDate).verificationEventStatus === 'ACTIVE') ? [_.last(statusUpdatesSortedByDate)] : [];
};

export default filterVerificationEventStatusUpdatesByActive;
