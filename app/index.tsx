import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';

import App from 'containers/App';
import { configureStore, createHistory } from 'startup';

// Mount application to the root element in the index.html file
const root: HTMLElement = document.getElementById('root') as HTMLElement;

const history = createHistory();
const store = configureStore(history);

const AppRoot = hot(module)(App);

const render = (): void =>
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <AppRoot />
      </ConnectedRouter>
    </Provider>,
    root,
  );

// And go!
render();
