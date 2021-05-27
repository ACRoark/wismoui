import { RouterState } from 'connected-react-router';
import { mock } from 'jest-mock-extended';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { Route } from 'react-router-dom';

import { SUPPORTED_LOCALES } from 'locales';
import { userIsAuthenticated } from 'security/utils';
import { createMockStore, createSnapshotWithIntl  } from 'testing/utils';
import { IApplicationConfig, IApplicationRootState, IAuthenticationState, ISearchState, IStartupState } from 'types';
import SearchPage from '..';

jest.mock('security/utils');

const defaultState: IApplicationRootState = {
  auth: mock<IAuthenticationState>(),
  config: mock<IApplicationConfig>(),
  router: mock<RouterState>(),
  search: mock<ISearchState>(),
  startup: mock<IStartupState>(),
  tracker: {
    error: undefined,
    loading: false,
    order: undefined,
  },
};

const mockAuth = userIsAuthenticated as jest.MockedFunction<typeof userIsAuthenticated>;

const testSearchPageSnapshot = (initialState: IApplicationRootState = defaultState, language: string, url: string): void => {
  const store = createMockStore(initialState);

  const tree = createSnapshotWithIntl(
    <MemoryRouter initialEntries={[url]}>
      <Route path="search">
        <Provider store={store}>
          <SearchPage />
        </Provider>
      </Route>
    </MemoryRouter>, language);

  expect(tree).toMatchSnapshot();
};
describe('<SearchPage />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  mockAuth.mockReturnValue(false);

  languages.forEach((language: string): void => {
    it(`should render correctly when there is no error and the language is ${language}`, (): void => {
      testSearchPageSnapshot(defaultState, language, 'search');
    });
  });
});
