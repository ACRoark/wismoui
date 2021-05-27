import { RouterState } from 'connected-react-router';
import { mock } from 'jest-mock-extended';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { SUPPORTED_LOCALES } from 'locales';

import { userIsAuthenticated } from 'security/utils';
import { createMockStore, createSnapshotWithIntl, renderWithIntl } from 'testing/utils';
import { IApplicationConfig, IApplicationRootState, IAuthenticationState, ISearchState, IStartupState } from 'types';

import ServiceRequestViewHeader from '..';

jest.mock('security/utils');

const mockAuth = userIsAuthenticated as jest.MockedFunction<typeof userIsAuthenticated>;

const orderNumbers = ['MI12345678', 'MO12345678', 'MT12345678'];

const multipleSearchResultsState: IApplicationRootState = {
  auth: mock<IAuthenticationState>(),
  config: mock<IApplicationConfig>(),
  router: mock<RouterState>(),
  search: mock<ISearchState>({
    error: undefined,
    loading: false,
    results: [
      {},
      {}
      ],
  }),
  startup: mock<IStartupState>(),
  tracker: {
    error: undefined,
    loading: false,
    order: undefined,
  },
};

const singleSearchResultState: IApplicationRootState = {
  auth: mock<IAuthenticationState>(),
  config: mock<IApplicationConfig>(),
  router: mock<RouterState>(),
  search: mock<ISearchState>({
    error: undefined,
    loading: false,
    results: [{}],
  }),
  startup: mock<IStartupState>(),
  tracker: {
    error: undefined,
    loading: false,
    order: undefined,
  },
};

const expectComponentToMatchSnapshot = (isAuthenticated: boolean, language: string, orderNumber: string, searchResults: IApplicationRootState): void => {
  mockAuth.mockReturnValue(isAuthenticated);
  const store = createMockStore(searchResults);

  const tree = createSnapshotWithIntl(
    <Router>
      <Provider store={store}>
        <ServiceRequestViewHeader serviceRequestNumber={orderNumber}/>
      </Provider>
    </Router>, language);

  expect(tree).toMatchSnapshot();
};

const shouldNotLogErrors = (isAuthenticated: boolean, language: string, orderNumber: string, searchResults: IApplicationRootState): void => {
  mockAuth.mockReturnValue(isAuthenticated);
  const store = createMockStore(searchResults);

  const spy = jest.spyOn(global.console, 'error');

  renderWithIntl(
    <Router>
      <Provider store={store}>
        <ServiceRequestViewHeader serviceRequestNumber={orderNumber}/>
      </Provider>
    </Router>, language);

  expect(spy).not.toHaveBeenCalled();
};

describe('<ServiceRequestViewHeader />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    orderNumbers.forEach((orderNumber: string): void => {
      it(`should not log errors when rendered in ${language} for order ${orderNumber}, search has many results and user is authenticated`, (): void => {
        shouldNotLogErrors(true, language, orderNumber, multipleSearchResultsState);
      });

      it(`should not log errors when rendered in ${language} for order ${orderNumber}, search has one result and user is authenticated`, (): void => {
        shouldNotLogErrors(true, language, orderNumber, singleSearchResultState);
      });

      it(`should not log errors when rendered in ${language} for order ${orderNumber}, search has many results and user is not authenticated`, (): void => {
        shouldNotLogErrors(false, language, orderNumber, multipleSearchResultsState);
      });

      it(`should not log errors when rendered in ${language} for order ${orderNumber}, search has one result and user is not authenticated`, (): void => {
        shouldNotLogErrors(false, language, orderNumber, singleSearchResultState);
      });

      // tslint:disable-next-line:max-line-length
      it(`should render correctly for order number ${orderNumber} when the current language is ${language}, search has many results, and user is authenticated`, (): void => {
        expectComponentToMatchSnapshot(true, language, orderNumber, multipleSearchResultsState);
      });

      // tslint:disable-next-line:max-line-length
      it(`should render correctly for order number ${orderNumber} when the current language is ${language}, search has one results, and user is authenticated`, (): void => {
        expectComponentToMatchSnapshot(true, language, orderNumber, singleSearchResultState);
      });

      it(`should render correctly for order number ${orderNumber} when the current language is ${language}, search has many results, and user is not authenticated`, (): void => {
        expectComponentToMatchSnapshot(false, language, orderNumber, multipleSearchResultsState);
      });

      it(`should render correctly for order number ${orderNumber} when the current language is ${language}, search has one result, and user is not authenticated`, (): void => {
        expectComponentToMatchSnapshot(false, language, orderNumber, singleSearchResultState);
      });
    });
  });
});
