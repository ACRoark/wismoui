import { Action } from 'redux';

import { IOrder } from 'types';

import * as ACTION_TYPES from '../../actionTypes';

export interface FindOrderCompleted extends Action<typeof ACTION_TYPES.FIND_ORDER_COMPLETED> {
  order: IOrder;
}

export interface FindOrderFailed extends Action<typeof ACTION_TYPES.FIND_ORDER_FAILED> {
  reason: string;
}

export interface FindOrderStarted extends Action<typeof ACTION_TYPES.FIND_ORDER_STARTED> {}

export type FindOrderActions = FindOrderCompleted | FindOrderFailed | FindOrderStarted;
