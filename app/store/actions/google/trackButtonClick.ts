// TODO: Move this into a router listener
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import googleTagManager from 'services/googleTagManager';
import { IApplicationRootState } from 'types';

const trackButtonClick = (
  dataTrackSubAction: string,
): ThunkAction<Promise<void>, IApplicationRootState, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => IApplicationRootState,
): Promise<void> => {
  const { router, tracker } = getState();
  const { order } = tracker;

  const getDataTrackDetail = (): string => {
    switch (order?.orderType) {
      case 'MIMO_START':
        return 'start';
      case 'MIMO_STOP':
        return 'stop';
      case 'MIMO_TRANSFER':
        return 'transfer';
      default:
        throw new Error('Invalid order type');
    }
  };

  googleTagManager.trackButtonClick(router.location, getDataTrackDetail(), dataTrackSubAction);
};

export default trackButtonClick;
