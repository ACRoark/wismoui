import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import authenticate from 'security/authenticate';
import { IApplicationRootState } from 'types';

import * as ACTION_TYPES from '../../actionTypes';
import { AuthenticationCompleted, AuthenticationFailed, AuthenticationStarted } from './authenticationActions';

const authenticateUser = (): ThunkAction<Promise<void>, IApplicationRootState, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
): Promise<void> => {
  const startAction: AuthenticationStarted = {
    type: ACTION_TYPES.AUTHENTICATION_STARTED,
  };

  dispatch(startAction);

  try {
    const result = await authenticate();

    const completedAction: AuthenticationCompleted = {
      success: result.success,
      token: result.token,
      type: ACTION_TYPES.AUTHENTICATION_COMPLETED,
    };

    dispatch(completedAction);
  } catch (error) {
    const failedAction: AuthenticationFailed = {
      reason: error,
      type: ACTION_TYPES.AUTHENTICATION_FAILED,
    };

    dispatch(failedAction);
  }
};

export default authenticateUser;
