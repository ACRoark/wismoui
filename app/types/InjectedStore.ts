import { Store } from 'redux';

interface InjectedStore extends Store {
  // tslint:disable-next-line: no-any
  injectedReducers: any;
}

export default InjectedStore;
