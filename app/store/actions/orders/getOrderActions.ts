import { Action } from 'redux';

import { IOrder } from 'types';

import * as ACTION_TYPES from '../../actionTypes';

export interface GetOrderCompleted extends Action<typeof ACTION_TYPES.GET_ORDER_COMPLETED> {
  order: IOrder;
}

export interface GetOrderFailed extends Action<typeof ACTION_TYPES.GET_ORDER_FAILED> {
  reason: string;
}

export interface GetOrderStarted extends Action<typeof ACTION_TYPES.GET_ORDER_STARTED> {}

export type GetOrderActions = GetOrderCompleted | GetOrderFailed | GetOrderStarted;
