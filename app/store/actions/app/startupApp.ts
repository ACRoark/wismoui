import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { appendDynatraceScript } from 'services/dynatrace';
import { appendGigyaScript } from 'services/gigya';
import { IApplicationRootState } from 'types';

import * as ACTION_TYPES from '../../actionTypes';
import { loadConfig } from '../config';
import { authenticateUser } from '../security';
import { StartupCompleted, StartupFailed, StartupStarted } from './startupActions';

const startupApp = (): ThunkAction<Promise<void>, IApplicationRootState, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => IApplicationRootState,
): Promise<void> => {
  const startAction: StartupStarted = {
    type: ACTION_TYPES.STARTUP_STARTED,
  };

  dispatch(startAction);

  try {
    await dispatch(loadConfig());

    const {
      config: { gigyaSiteKey, urls },
    } = getState();

    // TODO: Consider moving GTM initialization code here, too

    appendDynatraceScript(urls.dynatraceScript);

    await appendGigyaScript(gigyaSiteKey);

    await dispatch(authenticateUser());

    const completedAction: StartupCompleted = {
      type: ACTION_TYPES.STARTUP_COMPLETED,
    };

    dispatch(completedAction);
  } catch (error) {
    const failedAction: StartupFailed = {
      reason: error,
      type: ACTION_TYPES.STARTUP_FAILED,
    };

    dispatch(failedAction);
  }
};

export default startupApp;
