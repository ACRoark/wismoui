import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { SUPPORTED_LOCALES } from 'locales';

import createFakeSearchResult from 'components/createFakeSearchResult';
import { createMockStore, createSnapshotWithIntl, renderWithIntl } from 'testing/utils';
import { OrderRequestType, OrderRequestTypes } from 'types';

import OrderListItem from '../OrderListItem';

// NOTE: We cannot use generate.OrderRequest because we need static data for snapshots;
//       otherwise, the snapshot would be different each time it is run.
const orderNumber = 'MI12345678';
const baseRequest = createFakeSearchResult(orderNumber).orderRequests[0];
const store = createMockStore();

const expectNoConsoleErrors = (language: string, requestType: OrderRequestType): void => {
  const spy = jest.spyOn(global.console, 'error');

  const request = {
    ...baseRequest,
    OrderRequestType: requestType,
  };

  renderWithIntl(
    <Router>
      <Provider store={store}>
        <OrderListItem orderNumber={orderNumber} request={request} />
      </Provider>
    </Router>, language);

  expect(spy).not.toHaveBeenCalled();
};

const expectComponentToMatchSnapshot = (language: string, requestType: OrderRequestType): void => {
  const request = {
    ...baseRequest,
    OrderRequestType: requestType,
  };

  const tree = createSnapshotWithIntl(
    <Router>
      <Provider store={store}>
        <OrderListItem orderNumber={orderNumber} request={request} />
      </Provider>
    </Router>, language);

  expect(tree).toMatchSnapshot();
};

describe('<OrderListItem />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    OrderRequestTypes.forEach((requestType: OrderRequestType): void => {
      it(`should not log errors in console when rendered for '${requestType}' requests and the current language is ${language}`, (): void =>
        expectNoConsoleErrors(language, requestType));

      it(`should render correctly when the request type is '${requestType}' and the current language is ${language}`, (): void =>
        expectComponentToMatchSnapshot(language, requestType));
    });
  });
});
