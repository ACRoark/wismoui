import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { IApplicationRootState } from 'types';

import * as ACTION_TYPES from '../../actionTypes';

import { ResetTrackerState } from './trackerActions';

const resetTracker = (): ThunkAction<Promise<void>, IApplicationRootState, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
): Promise<void> => {
  const action: ResetTrackerState = {
    type: ACTION_TYPES.RESET_TRACKER_STATE,
  };
  dispatch(action);
};

export default resetTracker;
