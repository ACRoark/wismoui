import { Reducer } from 'react';

import { SearchOrdersActions } from 'store/actions/orders/searchOrdersActions';
import * as ACTION_TYPES from 'store/actionTypes';
import { initialSearchState } from 'store/defaults';
import { ISearchState } from 'types';

const searchReducer: Reducer<ISearchState, SearchOrdersActions> = (
  state: ISearchState = initialSearchState,
  action: SearchOrdersActions,
): ISearchState => {
  switch (action.type) {
    case ACTION_TYPES.ORDER_SEARCH_COMPLETED: {
      return {
        ...state,
        results: action.results,
        loading: false,
      };
    }
    case ACTION_TYPES.ORDER_SEARCH_FAILED: {
      return {
        ...state,
        error: action.reason,
        loading: false,
      };
    }
    case ACTION_TYPES.ORDER_SEARCH_STARTED: {
      return {
        ...state,
        error: undefined,
        loading: true,
        results: undefined,
      };
    }
    default:
      return state;
  }
};

export default searchReducer;
