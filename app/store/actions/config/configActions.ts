import { Action } from 'redux';

import * as ACTION_TYPES from '../../actionTypes';

export interface LoadConfigCompleted extends Action<typeof ACTION_TYPES.LOAD_CONFIG_COMPLETED> {
  // tslint:disable-next-line: no-any
  data: any; // We want to support any object so the file does not have to contain every setting
}

export interface LoadConfigFailed extends Action<typeof ACTION_TYPES.LOAD_CONFIG_FAILED> {
  reason: string;
}

export interface LoadConfigStarted extends Action<typeof ACTION_TYPES.LOAD_CONFIG_STARTED> {}

export type ConfigActions = LoadConfigCompleted | LoadConfigFailed | LoadConfigStarted;
