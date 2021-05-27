import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import thunk from 'redux-thunk';

// tslint:disable-next-line: no-any
const configureMiddleware = (history: History): any => {
  // Create the store with one middleware (for now)
  // 1. routerMiddleware: Syncs the location/URL path to the state
  // 2. Thunk: for basic side-effects and async logic
  const middleware = [routerMiddleware(history), thunk];

  return middleware;
};

export default configureMiddleware;
