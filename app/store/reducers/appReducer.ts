import { Reducer } from 'react';

import { StartupActions } from 'store/actions';
import * as ACTION_TYPES from 'store/actionTypes';
import { initialStartupState } from 'store/defaults';
import { IStartupState } from 'types';

const appReducer: Reducer<IStartupState, StartupActions> = (
  state: IStartupState = initialStartupState,
  action: StartupActions,
): IStartupState => {
  switch (action.type) {
    case ACTION_TYPES.STARTUP_COMPLETED: {
      return {
        error: undefined,
        starting: false,
      };
    }
    case ACTION_TYPES.STARTUP_FAILED: {
      return {
        error: action.reason,
        starting: false,
      };
    }
    case ACTION_TYPES.STARTUP_STARTED: {
      return {
        error: undefined,
        starting: true,
      };
    }
    default:
      return state;
  }
};

export default appReducer;
