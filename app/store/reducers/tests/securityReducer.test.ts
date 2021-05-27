import { AuthenticationCompleted, AuthenticationFailed, AuthenticationStarted } from 'store/actions/security/authenticationActions';

import { IAuthenticationState } from 'types';

import * as ACTION_TYPES from '../../actionTypes';
import securityReducer from '../securityReducer';

describe('userReducer', (): void => {
  it('should clear the error field when the AUTHENTICATION_STARTED action is dispatched', (): void => {
    const action: AuthenticationStarted = {
      type: ACTION_TYPES.AUTHENTICATION_STARTED,
    };
    const state: IAuthenticationState = {
      error: 'whatever',
      isAuthenticated: false,
      loading: false,
    };

    const updatedState = securityReducer(state, action);

    expect(updatedState.error).toBeUndefined();
  });

  it('should set the error field when the AUTHENTICATION_FAILED action is dispatched', (): void => {
    const expected = 'whatever';

    const action: AuthenticationFailed = {
      reason: expected,
      type: ACTION_TYPES.AUTHENTICATION_FAILED,
    };
    const state: IAuthenticationState = {
      isAuthenticated: false,
      loading: false,
    };

    const updatedState = securityReducer(state, action);

    expect(updatedState.error).toBe(expected);
  });

  it('should set the isAuthenticated flag to false when the AUTHENTICATION_COMPLETED action is dispatched and authentication was unsuccessful', (): void => {
    const action: AuthenticationCompleted = {
      success: false,
      type: ACTION_TYPES.AUTHENTICATION_COMPLETED,
    };
    const state: IAuthenticationState = {
      isAuthenticated: true,
      loading: false,
    };

    const updatedState = securityReducer(state, action);

    expect(updatedState.isAuthenticated).toBe(false);
  });

  it('should set the isAuthenticated flag to false when the AUTHENTICATION_STARTED action is dispatched', (): void => {
    const action: AuthenticationStarted = {
      type: ACTION_TYPES.AUTHENTICATION_STARTED,
    };
    const state: IAuthenticationState = {
      isAuthenticated: true,
      loading: false,
    };

    const updatedState = securityReducer(state, action);

    expect(updatedState.isAuthenticated).toBe(false);
  });

  it('should set the isAuthenticated flag to true when the AUTHENTICATION_COMPLETED action is dispatched and authentication was successful', (): void => {
    const action: AuthenticationCompleted = {
      success: true,
      type: ACTION_TYPES.AUTHENTICATION_COMPLETED,
    };
    const state: IAuthenticationState = {
      isAuthenticated: false,
      loading: false,
    };

    const updatedState = securityReducer(state, action);

    expect(updatedState.isAuthenticated).toBe(true);
  });

  it('should set the loading flag to false when the AUTHENTICATION_COMPLETED action is dispatched', (): void => {
    const action: AuthenticationCompleted = {
      success: false,
      type: ACTION_TYPES.AUTHENTICATION_COMPLETED,
    };
    const state: IAuthenticationState = {
      isAuthenticated: false,
      loading: true,
    };

    const updatedState = securityReducer(state, action);

    expect(updatedState.loading).toBe(false);
  });

  it('should set the loading flag to false when the AUTHENTICATION_FAILED action is dispatched', (): void => {
    const action: AuthenticationFailed = {
      reason: 'whatever',
      type: ACTION_TYPES.AUTHENTICATION_FAILED,
    };
    const state: IAuthenticationState = {
      isAuthenticated: false,
      loading: true,
    };

    const updatedState = securityReducer(state, action);

    expect(updatedState.loading).toBe(false);
  });

  it('should set the loading flag to true when the AUTHENTICATION_STARTED action is dispatched', (): void => {
    const action: AuthenticationStarted = {
      type: ACTION_TYPES.AUTHENTICATION_STARTED,
    };
    const state: IAuthenticationState = {
      isAuthenticated: false,
      loading: false,
    };

    const updatedState = securityReducer(state, action);

    expect(updatedState.loading).toBe(true);
  });
});
