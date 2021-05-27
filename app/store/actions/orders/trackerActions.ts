import { Action } from 'redux';

import * as ACTION_TYPES from '../../actionTypes';

export interface ResetTrackerState extends Action<typeof ACTION_TYPES.RESET_TRACKER_STATE> {}

export type TrackerActions = ResetTrackerState;
