// TODO: Move this into a router listener
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import googleTagManager from 'services/googleTagManager';
import { IApplicationRootState } from 'types';

const sendPageView = (page: string): ThunkAction<Promise<void>, IApplicationRootState, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => IApplicationRootState,
): Promise<void> => {
  const { config, router } = getState();

  if (config && config.googleTagManagerConfig) {
    googleTagManager.sendPageView(router.location, page);
  }
};

export default sendPageView;
