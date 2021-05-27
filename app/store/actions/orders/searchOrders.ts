import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import ordersApiClient from 'services/ordersApiClient';
import { IApplicationRootState } from 'types';

import * as ACTION_TYPES from '../../actionTypes';
import { OrderSearchCompleted, OrderSearchFailed, OrderSearchStarted } from './searchOrdersActions';

const searchOrders = (bug2263?: boolean): ThunkAction<Promise<void>, IApplicationRootState, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => IApplicationRootState,
): Promise<void> => {
  const startAction: OrderSearchStarted = {
    type: ACTION_TYPES.ORDER_SEARCH_STARTED,
  };

  dispatch(startAction);

  try {
    const { config } = getState();

    const results = bug2263
      ? await ordersApiClient.searchOrdersAsync(config.urls.searchOrders, bug2263)
      : await ordersApiClient.searchOrdersAsync(config.urls.searchOrders);

    const completedAction: OrderSearchCompleted = {
      results: results.orders,
      type: ACTION_TYPES.ORDER_SEARCH_COMPLETED,
    };

    dispatch(completedAction);
  } catch (error) {
    const failedAction: OrderSearchFailed = {
      reason: error,
      type: ACTION_TYPES.ORDER_SEARCH_FAILED,
    };

    dispatch(failedAction);
  }
};

export default searchOrders;
