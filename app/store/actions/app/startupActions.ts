import { Action } from 'redux';

import * as ACTION_TYPES from '../../actionTypes';

export interface StartupCompleted extends Action<typeof ACTION_TYPES.STARTUP_COMPLETED> {}

export interface StartupFailed extends Action<typeof ACTION_TYPES.STARTUP_FAILED> {
  reason: string;
}

export interface StartupStarted extends Action<typeof ACTION_TYPES.STARTUP_STARTED> {}

export type StartupActions = StartupCompleted | StartupFailed | StartupStarted;
