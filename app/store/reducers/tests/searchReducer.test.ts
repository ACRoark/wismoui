import createFakeSearchResult from 'components/createFakeSearchResult';
import { OrderSearchCompleted, OrderSearchFailed, OrderSearchStarted } from 'store/actions/orders/searchOrdersActions';

import { ISearchState } from 'types';

import * as ACTION_TYPES from '../../actionTypes';
import searchReducer from '../searchReducer';

describe('searchReducer', (): void => {
  it('should clear the error field when the ORDER_SEARCH_STARTED action is dispatched', (): void => {
    const action: OrderSearchStarted = {
      type: ACTION_TYPES.ORDER_SEARCH_STARTED,
    };
    const state: ISearchState = {
      error: 'whatever',
      loading: false,
    };

    const updatedState = searchReducer(state, action);

    expect(updatedState.error).toBeUndefined();
  });

  it('should set the error field when the ORDER_SEARCH_FAILED action is dispatched', (): void => {
    const expected = 'whatever';

    const action: OrderSearchFailed = {
      reason: expected,
      type: ACTION_TYPES.ORDER_SEARCH_FAILED,
    };
    const state: ISearchState = {
      loading: false,
    };

    const updatedState = searchReducer(state, action);

    expect(updatedState.error).toBe(expected);
  });

  it('should set the order field to undefined when the ORDER_SEARCH_STARTED action is dispatched', (): void => {
    const action: OrderSearchStarted = {
      type: ACTION_TYPES.ORDER_SEARCH_STARTED,
    };
    const state: ISearchState = {
      loading: false,
    };

    const updatedState = searchReducer(state, action);

    expect(updatedState.results).toBe(undefined);
  });

  it('should set the order field when the ORDER_SEARCH_COMPLETED action is dispatched and request was successful', (): void => {
    const results = [
      createFakeSearchResult('MI12345678'),
      createFakeSearchResult('MO12345678'),
      createFakeSearchResult('MT12345678'),
    ];

    const action: OrderSearchCompleted = {
      results,
      type: ACTION_TYPES.ORDER_SEARCH_COMPLETED,
    };
    const state: ISearchState = {
      loading: false,
    };

    const updatedState = searchReducer(state, action);

    expect(updatedState.results).toBe(results);
  });

  it('should set the loading flag to false when the ORDER_SEARCH_COMPLETED action is dispatched', (): void => {
    const results = [
      createFakeSearchResult('MI12345678'),
      createFakeSearchResult('MO12345678'),
      createFakeSearchResult('MT12345678'),
    ];

    const action: OrderSearchCompleted = {
      results,
      type: ACTION_TYPES.ORDER_SEARCH_COMPLETED,
    };
    const state: ISearchState = {
      loading: true,
    };

    const updatedState = searchReducer(state, action);

    expect(updatedState.loading).toBe(false);
  });

  it('should set the loading flag to false when the ORDER_SEARCH_FAILED action is dispatched', (): void => {
    const action: OrderSearchFailed = {
      reason: 'whatever',
      type: ACTION_TYPES.ORDER_SEARCH_FAILED,
    };
    const state: ISearchState = {
      loading: true,
    };

    const updatedState = searchReducer(state, action);

    expect(updatedState.loading).toBe(false);
  });

  it('should set the loading flag to true when the ORDER_SEARCH_STARTED action is dispatched', (): void => {
    const action: OrderSearchStarted = {
      type: ACTION_TYPES.ORDER_SEARCH_STARTED,
    };
    const state: ISearchState = {
      loading: false,
    };

    const updatedState = searchReducer(state, action);

    expect(updatedState.loading).toBe(true);
  });
});
