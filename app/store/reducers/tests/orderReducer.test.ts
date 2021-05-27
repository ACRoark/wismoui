import createFakeOrder from 'components/createFakeOrder';
import { GetOrderCompleted, GetOrderFailed, GetOrderStarted } from 'store/actions/orders/getOrderActions';

import { ITrackerState } from 'types';

import * as ACTION_TYPES from '../../actionTypes';
import orderReducer from '../orderReducer';

describe('orderReducer', (): void => {
  it('should clear the error field when the GET_ORDER_STARTED action is dispatched', (): void => {
    const action: GetOrderStarted = {
      type: ACTION_TYPES.GET_ORDER_STARTED,
    };
    const state: ITrackerState = {
      error: 'whatever',
      loading: false,
    };

    const updatedState = orderReducer(state, action);

    expect(updatedState.error).toBeUndefined();
  });

  it('should set the error field when the GET_ORDER_FAILED action is dispatched', (): void => {
    const expected = 'whatever';

    const action: GetOrderFailed = {
      reason: expected,
      type: ACTION_TYPES.GET_ORDER_FAILED,
    };
    const state: ITrackerState = {
      loading: false,
    };

    const updatedState = orderReducer(state, action);

    expect(updatedState.error).toBe(expected);
  });

  it('should set the order field to undefined when the GET_ORDER_STARTED action is dispatched', (): void => {
    const action: GetOrderStarted = {
      type: ACTION_TYPES.GET_ORDER_STARTED,
    };
    const state: ITrackerState = {
      loading: false,
    };

    const updatedState = orderReducer(state, action);

    expect(updatedState.order).toBe(undefined);
  });

  it('should set the order field when the GET_ORDER_COMPLETED action is dispatched and request was successful', (): void => {
    const order = createFakeOrder('MI12345678');

    const action: GetOrderCompleted = {
      order,
      type: ACTION_TYPES.GET_ORDER_COMPLETED,
    };
    const state: ITrackerState = {
      loading: false,
    };

    const updatedState = orderReducer(state, action);

    expect(updatedState.order).toBe(order);
  });

  it('should set the loading flag to false when the GET_ORDER_COMPLETED action is dispatched', (): void => {
    const order = createFakeOrder('MI12345678');

    const action: GetOrderCompleted = {
      order,
      type: ACTION_TYPES.GET_ORDER_COMPLETED,
    };
    const state: ITrackerState = {
      loading: true,
    };

    const updatedState = orderReducer(state, action);

    expect(updatedState.loading).toBe(false);
  });

  it('should set the loading flag to false when the GET_ORDER_FAILED action is dispatched', (): void => {
    const action: GetOrderFailed = {
      reason: 'whatever',
      type: ACTION_TYPES.GET_ORDER_FAILED,
    };
    const state: ITrackerState = {
      loading: true,
    };

    const updatedState = orderReducer(state, action);

    expect(updatedState.loading).toBe(false);
  });

  it('should set the loading flag to true when the GET_ORDER_STARTED action is dispatched', (): void => {
    const action: GetOrderStarted = {
      type: ACTION_TYPES.GET_ORDER_STARTED,
    };
    const state: ITrackerState = {
      loading: false,
    };

    const updatedState = orderReducer(state, action);

    expect(updatedState.loading).toBe(true);
  });
});
