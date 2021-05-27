import { History } from 'history';
import { applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import configureMiddleware from './configureMiddleware';

// tslint:disable-next-line: no-any
const createEnhancer = (history: History): any => {
  const middleware = configureMiddleware(history);

  const enhancers = [applyMiddleware(...middleware)];

  // If Redux Dev Tools are installed, enable them
  const enhancer =
    process.env.NODE_ENV !== 'production' && typeof window === 'object'
      ? composeWithDevTools(...enhancers)
      : compose(...enhancers);

  return enhancer;
};

export default createEnhancer;
