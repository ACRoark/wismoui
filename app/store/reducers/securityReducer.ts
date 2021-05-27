import { Reducer } from 'react';

import { AuthenticationActions } from 'store/actions/security/authenticationActions';
import * as ACTION_TYPES from 'store/actionTypes';
import { initialUserState } from 'store/defaults';
import { IAuthenticationState } from 'types';

const securityReducer: Reducer<IAuthenticationState, AuthenticationActions> = (
  state: IAuthenticationState = initialUserState,
  action: AuthenticationActions,
): IAuthenticationState => {
  switch (action.type) {
    case ACTION_TYPES.AUTHENTICATION_COMPLETED: {
      return {
        ...state,
        isAuthenticated: action.success,
        loading: false,
      };
    }
    case ACTION_TYPES.AUTHENTICATION_FAILED: {
      return {
        ...state,
        error: action.reason,
        loading: false,
      };
    }
    case ACTION_TYPES.AUTHENTICATION_STARTED: {
      return {
        ...state,
        error: undefined,
        loading: true,
        isAuthenticated: false,
      };
    }
    default:
      return state;
  }
};

export default securityReducer;
