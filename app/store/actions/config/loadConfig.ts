import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { httpClient, IHttpResponse } from 'services/httpClient';
import { IApplicationRootState } from 'types';

import * as ACTION_TYPES from '../../actionTypes';
import { LoadConfigCompleted, LoadConfigFailed, LoadConfigStarted } from './configActions';

const loadConfig = (): ThunkAction<Promise<void>, IApplicationRootState, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
): Promise<void> => {
  const startAction: LoadConfigStarted = {
    type: ACTION_TYPES.LOAD_CONFIG_STARTED,
  };

  dispatch(startAction);

  try {
    const result = await httpClient.get('/config.json').then((response: IHttpResponse): string => response.data);

    const completedAction: LoadConfigCompleted = {
      data: result,
      type: ACTION_TYPES.LOAD_CONFIG_COMPLETED,
    };

    dispatch(completedAction);
  } catch (error) {
    const failedAction: LoadConfigFailed = {
      reason: error,
      type: ACTION_TYPES.LOAD_CONFIG_FAILED,
    };

    dispatch(failedAction);
  }
};

export default loadConfig;
