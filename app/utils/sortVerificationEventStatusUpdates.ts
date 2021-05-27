import moment from 'moment';

import IVerificationEventStatusUpdate from 'types/IVerificationEventStatusUpdate';

const sortVerificationEventStatusUpdates = (verificationEventStatusUpdates: IVerificationEventStatusUpdate[]): IVerificationEventStatusUpdate[] =>
  verificationEventStatusUpdates.sort(
    (a: IVerificationEventStatusUpdate, b: IVerificationEventStatusUpdate): number =>
      moment(`${a.createdAtDate}T${a.createdAtTime}`).unix() - moment(`${b.createdAtDate}T${b.createdAtTime}`).unix(),
  );

export default sortVerificationEventStatusUpdates;
