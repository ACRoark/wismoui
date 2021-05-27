import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import ordersApiClient from 'services/ordersApiClient';
import { IApplicationRootState, IOrder } from 'types';

import * as ACTION_TYPES from '../../actionTypes';

import { GetOrderCompleted, GetOrderFailed, GetOrderStarted } from './getOrderActions';

const getOrderFromApi = (url: string, orderNumber: string): Promise<IOrder> =>
  ordersApiClient.getOrderAsync(url, orderNumber).then((result: IOrder): IOrder => result);

const getOrder = (orderNumber: string): ThunkAction<Promise<void>, IApplicationRootState, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => IApplicationRootState,
): Promise<void> => {
  const startAction: GetOrderStarted = {
    type: ACTION_TYPES.GET_ORDER_STARTED,
  };

  dispatch(startAction);

  try {
    const { config } = getState();

    const order = await getOrderFromApi(config.urls.getOrder, orderNumber);

    const completedAction: GetOrderCompleted = {
      order,
      type: ACTION_TYPES.GET_ORDER_COMPLETED,
    };

    dispatch(completedAction);
  } catch (error) {
    const failedAction: GetOrderFailed = {
      reason: error.message || error,
      type: ACTION_TYPES.GET_ORDER_FAILED,
    };

    dispatch(failedAction);
  }
};

export default getOrder;
