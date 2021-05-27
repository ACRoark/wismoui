import { RouterState } from 'connected-react-router';
// import { mount } from 'enzyme';
import { mock } from 'jest-mock-extended';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { SUPPORTED_LOCALES } from 'locales';

import { testConfig } from 'components/constants';
import createFakeSearchResult from 'components/createFakeSearchResult';
// import NotFoundPage from 'components/NotFoundPage';
// import SearchPage from 'components/SearchPage';
// import OrderStatusPage from 'containers/OrderStatusPage';
// import SummaryPage from 'containers/SummaryPage';
import useModal from 'hooks/useModal';
// import { LanguageProvider } from 'providers/LanguageProvider';
import { userIsAuthenticated } from 'security/utils';
import { createMockStore, renderWithIntl } from 'testing/utils';
import { IApplicationRootState, IStartupState, ITrackerState } from 'types';

import Routes from '..';

jest.mock('hooks/useModal');
jest.mock('security/utils');

// TODO: These tests are WAY too complicated and fragile
//       We have to include two orders here otherwise the tests for the SummaryPage will fail because
//       that page's internals will redirect the browser to the StatusPage when there's only one.
//
//       Ideally, we could do this with shallow and inspect what route is returned but that doesn't
//       seen to be feasible. So, we need a better way.
const initialState: IApplicationRootState = {
  auth: { isAuthenticated: false, loading: false },
  config: { ...testConfig },
  router: mock<RouterState>(),
  search: {
    loading: false,
    results: [
      createFakeSearchResult('MI34567890'),
      createFakeSearchResult('MO34567890'),
    ]
  },
  startup: mock<IStartupState>(),
  tracker: mock<ITrackerState>(),
};

// const mockAuth = selectAuthState as jest.MockedFunction<typeof selectAuthState>;
const mockAuth = userIsAuthenticated as jest.MockedFunction<typeof userIsAuthenticated>;
// const mockConfig = selectConfigState as jest.MockedFunction<typeof selectConfigState>;
const mockModal = useModal as jest.MockedFunction<typeof useModal>;

const store = createMockStore(initialState);

// tslint:disable-next-line: typedef
// const mountRoutes = (language: string, initialEntries: string[], authenticated: boolean = false) => {
//   mockAuth.mockReturnValue({ authenticationIsRequired: true, isAuthenticated: authenticated, loading: false });
//   mockConfig.mockReturnValue({ ...testConfig });
//   mockModal.mockReturnValue({
//     hideModal: jest.fn(),
//     showModal: jest.fn(),
//   });

//   return mount(
//     <Provider store={store}>
//       <LanguageProvider locale={language}>
//         <MemoryRouter initialEntries={initialEntries}>
//           <Routes/>
//         </MemoryRouter>
//       </LanguageProvider>
//     </Provider>
//   );
// };

describe('<Routes />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  // NOTE: language should not have any affect on the routes, but we test for each to be certain
  languages.forEach((language: string): void => {
    it(`should not log errors in console when rendered with the path / and the current language is ${language}`, (): void => {
      // mockAuth.mockReturnValue({ isAuthenticated: true, loading:false });
      mockAuth.mockReturnValue(true);
      // mockConfig.mockReturnValue({ ...testConfig });
      mockModal.mockReturnValue({
        hideModal: jest.fn(),
        showModal: jest.fn(),
      });

      const spy = jest.spyOn(global.console, 'error');

      renderWithIntl(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <Routes/>
          </MemoryRouter>
        </Provider>,
        language
      );

      expect(spy).not.toHaveBeenCalled();
    });

    // it(`should redirect to the Summary page when navigating to the Home page and the user is authenticated (${language})`, (): void => {
    //   const component = mountRoutes(language, ['/'], true);

    //   expect(component.find(SummaryPage)).toHaveLength(1);
    // });

    // it(`should redirect to the Search page when navigating to the Home page and the user is not authenticated (${language})`, (): void => {
    //   const component = mountRoutes(language, ['/'], false);

    //   expect(component.find(SearchPage)).toHaveLength(1);
    // });

    // it(`should allow access to the Order Search page when the user is not authenticated (${language})`, (): void => {
    //   const component = mountRoutes(language, ['/search'], false);

    //   expect(component.find(SearchPage)).toHaveLength(1);
    // });

    // it(`should allow access to the Order Summary page when the user is authenticated (${language})`, (): void => {
    //   const component = mountRoutes(language, ['/orders'], true);

    //   expect(component.find(SummaryPage)).toHaveLength(1);
    // });

    // it(`should allow access to the Order Status page when the user is authenticated (${language})`, (): void => {
    //   const component = mountRoutes(language, ['/orders/MI12345678'], true);

    //   expect(component.find(OrderStatusPage)).toHaveLength(1);
    // });

    // it(`should not allow access to the Order Summary page when the user is not authenticated (${language})`, (): void => {
    //   const component = mountRoutes(language, ['/orders'], false);

    //   expect(component.find(SearchPage)).toHaveLength(1);
    // });

    // it(`should not allow access to the Order Status page when the user is not authenticated (${language})`, (): void => {
    //   const component = mountRoutes(language, ['/orders/MI12345678'], false);

    //   expect(component.find(SearchPage)).toHaveLength(1);
    // });

    // it(`should show the Not Found page when the path is not found (${language})`, (): void => {
    //   const component = mountRoutes(language, ['/unknown']);

    //   expect(component.find(NotFoundPage)).toHaveLength(1);
    // });
  });
});
