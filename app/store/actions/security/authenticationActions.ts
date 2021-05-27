import { Action } from 'redux';

import * as ACTION_TYPES from '../../actionTypes';

export interface AuthenticationCompleted extends Action<typeof ACTION_TYPES.AUTHENTICATION_COMPLETED> {
  success: boolean;
  token?: string;
}

export interface AuthenticationFailed extends Action<typeof ACTION_TYPES.AUTHENTICATION_FAILED> {
  reason: string;
}

export interface AuthenticationStarted extends Action<typeof ACTION_TYPES.AUTHENTICATION_STARTED> {}

export type AuthenticationActions = AuthenticationCompleted | AuthenticationFailed | AuthenticationStarted;
