import { Action } from 'redux';

import { IOrderSearchResult } from 'types';

import * as ACTION_TYPES from '../../actionTypes';

export interface OrderSearchCompleted extends Action<typeof ACTION_TYPES.ORDER_SEARCH_COMPLETED> {
  results: IOrderSearchResult[];
}

export interface OrderSearchFailed extends Action<typeof ACTION_TYPES.ORDER_SEARCH_FAILED> {
  reason: string;
}

export interface OrderSearchStarted extends Action<typeof ACTION_TYPES.ORDER_SEARCH_STARTED> {}

export type SearchOrdersActions = OrderSearchCompleted | OrderSearchFailed | OrderSearchStarted;
