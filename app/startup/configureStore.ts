import { History } from 'history';
import { createStore } from 'redux';

import { InjectedStore } from 'types';

import createEnhancer from './createEnhancer';
import createRootReducer from './createRootReducer';

const configureStore = (history: History): InjectedStore => {
  const enhancer = createEnhancer(history);

  const reducer = createRootReducer();

  const store: InjectedStore = createStore(reducer, enhancer);

  return store;
};

export default configureStore;
