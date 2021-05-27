import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import ordersApiClient from 'services/ordersApiClient';
import { IApplicationRootState, IOrder } from 'types';

import * as ACTION_TYPES from '../../actionTypes';
import hasErrorFromAPI from './hasErrorFromAPI';

import { FindOrderCompleted, FindOrderFailed, FindOrderStarted } from './findOrderActions';

const findOrderFromApi = (
  url: string,
  orderNumber: string,
  name: string,
  recaptchaToken: string,
  bug2263?: boolean,
): Promise<IOrder> =>
  ordersApiClient
    .findOrderAsync(url, orderNumber, name, recaptchaToken, bug2263)
    .then((result: IOrder): IOrder => result);

const findOrder = (
  orderNumber: string,
  name: string,
  recaptchaToken: string,
  bug2263?: boolean,
): ThunkAction<Promise<void>, IApplicationRootState, {}, AnyAction> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState: () => IApplicationRootState,
): Promise<void> => {
  const startAction: FindOrderStarted = {
    type: ACTION_TYPES.FIND_ORDER_STARTED,
  };

  dispatch(startAction);

  try {
    const { config } = getState();

    const order = await findOrderFromApi(config.urls.findOrder, orderNumber, name, recaptchaToken, bug2263);

    const completedAction: FindOrderCompleted = {
      order,
      type: ACTION_TYPES.FIND_ORDER_COMPLETED,
    };

    dispatch(completedAction);
  } catch (error) {
    const failedAction: FindOrderFailed = {
      reason: hasErrorFromAPI(error.code) || error.message || error,
      type: ACTION_TYPES.FIND_ORDER_FAILED,
    };

    dispatch(failedAction);
  }
};

export default findOrder;
