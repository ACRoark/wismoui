/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import { appReducer, configReducer, orderReducer, searchReducer, securityReducer } from 'store/reducers';

import createHistory from './createHistory';

// tslint:disable-next-line: no-any
const createRootReducer = (): any => {
  const history = createHistory();

  const rootReducer = combineReducers({
    auth: securityReducer,
    config: configReducer,
    // TODO: Add language reducer(s)
    router: connectRouter(history),
    search: searchReducer,
    startup: appReducer,
    tracker: orderReducer,
  });

  return rootReducer;
};

export default createRootReducer;
