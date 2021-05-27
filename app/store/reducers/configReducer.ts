import { Reducer } from 'react';

import { ConfigActions } from 'store/actions';
import * as ACTION_TYPES from 'store/actionTypes';
import { initialConfigState } from 'store/defaults';
import { IApplicationConfig } from 'types';

const configReducer: Reducer<IApplicationConfig, ConfigActions> = (
  state: IApplicationConfig = initialConfigState,
  action: ConfigActions,
): IApplicationConfig => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_CONFIG_COMPLETED: {
      return {
        ...state,
        ...action.data,
        flags: {
          ...state.flags,
          ...action.data.flags,
        },
        googleTagManagerConfig: {
          ...state.googleTagManagerConfig,
          ...action.data.googleTagManagerConfig,
        },
        urls: {
          ...state.urls,
          ...action.data.urls,
        },
        loading: false,
      };
    }
    case ACTION_TYPES.LOAD_CONFIG_FAILED: {
      return {
        ...state,
        error: action.reason,
        loading: false,
      };
    }
    case ACTION_TYPES.LOAD_CONFIG_STARTED: {
      return {
        ...state,
        error: undefined,
        loading: true,
      };
    }
    default:
      return state;
  }
};

export default configReducer;
