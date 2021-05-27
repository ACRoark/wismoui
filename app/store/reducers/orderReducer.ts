import { Reducer } from 'react';

import { OrderActions } from 'store/actions';
import * as ACTION_TYPES from 'store/actionTypes';
import { initialTrackerState } from 'store/defaults';
import { ITrackerState } from 'types';

const orderReducer: Reducer<ITrackerState, OrderActions> = (
  state: ITrackerState = initialTrackerState,
  action: OrderActions,
): ITrackerState => {
  switch (action.type) {
    case ACTION_TYPES.FIND_ORDER_COMPLETED:
    case ACTION_TYPES.GET_ORDER_COMPLETED: {
      return {
        ...state,
        loading: false,
        order: action.order,
      };
    }
    case ACTION_TYPES.FIND_ORDER_FAILED:
    case ACTION_TYPES.GET_ORDER_FAILED: {
      return {
        ...state,
        error: action.reason,
        loading: false,
      };
    }
    case ACTION_TYPES.FIND_ORDER_STARTED:
    case ACTION_TYPES.GET_ORDER_STARTED: {
      return {
        ...state,
        error: undefined,
        loading: true,
        order: undefined,
      };
    }
    case ACTION_TYPES.RESET_TRACKER_STATE: {
      return {
        ...state,
        error: undefined,
        loading: false,
        order: undefined,
      };
    }
    default:
      return state;
  }
};

export default orderReducer;
