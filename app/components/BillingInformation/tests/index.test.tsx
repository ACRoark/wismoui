import React from 'react';
import { Provider } from 'react-redux';

import { SUPPORTED_LOCALES } from 'locales';

import { testConfig } from 'components/constants';
import useConfig from 'hooks/useConfig';
import userIsAuthenticated from 'security/utils/userIsAuthenticated';
import { createMockStore, createSnapshotWithIntl, renderWithIntl } from 'testing/utils';

import BillingInformation from '..';

jest.mock('security/utils/userIsAuthenticated');
jest.mock('hooks/useConfig');

const mockAuth = userIsAuthenticated as jest.MockedFunction<typeof userIsAuthenticated>;
const mockConfig = useConfig as jest.MockedFunction<typeof useConfig>;

const requestType = ['MIMO_START', 'MIMO_STOP'];
const store = createMockStore();

const expectBillingInformationToMatchSnapshot = (authValue: boolean, language: string, orderRequestType: string): void => {
  mockAuth.mockReturnValue(authValue);
  mockConfig.mockReturnValue({ ...testConfig });

  const tree = createSnapshotWithIntl(<Provider store={store}><BillingInformation
    requestType={orderRequestType} /></Provider>, language);

  expect(tree).toMatchSnapshot();
};

describe('<BillingInformation/>', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    requestType.forEach((orderRequestType: string): void => {

      it(`should not log errors in console when rendered in ${language} with requestType of ${orderRequestType}`, (): void => {
        const spy = jest.spyOn(global.console, 'error');

        mockAuth.mockReturnValue(false);
        mockConfig.mockReturnValue({ ...testConfig });

        renderWithIntl(<Provider store={store}><BillingInformation
          requestType={orderRequestType} /></Provider>, language);

        expect(spy).not.toHaveBeenCalled();
      });

      it(`should render correctly when the current language is ${language}, and requestType is ${orderRequestType}, and user is not authenticated`, (): void =>
        expectBillingInformationToMatchSnapshot(false, language, orderRequestType));

      it(`should render correctly when the current language is ${language}, and requestType is ${orderRequestType}, and user is authenticated`, (): void =>
        expectBillingInformationToMatchSnapshot(true, language, orderRequestType));
    });
  });
});
