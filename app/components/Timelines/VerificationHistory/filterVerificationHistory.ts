import * as _ from 'lodash';
import IVerificationEventStatusUpdate from 'types/IVerificationEventStatusUpdate';

const filterVerificationHistory = (
  verificationEventStatusUpdates: IVerificationEventStatusUpdate[],
): IVerificationEventStatusUpdate[] => {
  const history: IVerificationEventStatusUpdate[] = [];

  verificationEventStatusUpdates.forEach((e: IVerificationEventStatusUpdate): void => {
    if (history.length === 0) {
      history.push(e);
    } else {
      const lastItem = _.last(history);

      if (lastItem.verificationCode === e.verificationCode) {
        if (
          lastItem.createdAtDate < e.createdAtDate ||
          (lastItem.createdAtDate === e.createdAtDate && lastItem.createdAtTime < e.createdAtTime)
        ) {
          _.remove(history, lastItem);
          history.push(e);
        }
      } else {
        history.push(e);
      }
    }
  });

  return history;
};

export default filterVerificationHistory;
