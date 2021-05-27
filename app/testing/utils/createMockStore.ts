import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import mockState from 'testing/mockState';
import { IApplicationRootState, InjectedStore } from 'types';

// tslint:disable-next-line: typedef
const createMockStore = (initialState: IApplicationRootState = mockState, middleware = [thunk]): InjectedStore => {
  const storeFactory = configureStore(middleware);

  const mockStore = storeFactory(initialState);

  return {
    ...mockStore,
    injectedReducers: {},
  };
};

export default createMockStore;
