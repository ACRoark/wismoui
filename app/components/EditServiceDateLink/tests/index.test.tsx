import React from 'react';
import { Provider } from 'react-redux';

import { SUPPORTED_LOCALES } from 'locales';

import { testConfig } from 'components/constants';
import useConfig from 'hooks/useConfig';
import useModal from 'hooks/useModal';
import { userIsAuthenticated } from 'security/utils';
import { createMockStore, createSnapshotWithIntl, renderWithIntl, today, tomorrow, yesterday } from 'testing/utils';

import EditServiceDateLink from '..';

jest.mock('hooks/useConfig');
jest.mock('hooks/useModal');
jest.mock('security/utils');

const mockAuth = userIsAuthenticated as jest.MockedFunction<typeof userIsAuthenticated>;
const mockConfig = useConfig as jest.MockedFunction<typeof useConfig>;
const mockModal = useModal as jest.MockedFunction<typeof useModal>;

const itIsToday = today().format('YYYY-MM-DD');
const itIsTomorrow = tomorrow().format('YYYY-MM-DD');
const itIsYesterday = yesterday().format('YYYY-MM-DD');

const store = createMockStore();

const expectComponentToMatchSnapshot = (language: string, date: string, isAuthenticated: boolean): void => {
  mockAuth.mockReturnValue(isAuthenticated);
  mockConfig.mockReturnValue({ ...testConfig });
  mockModal.mockReturnValue({
    hideModal: jest.fn(),
    showModal: jest.fn(),
  });

  const tree = createSnapshotWithIntl(<Provider store={store}><EditServiceDateLink wantDate={date}/></Provider>, language);

  expect(tree).toMatchSnapshot();
};

const shouldNotLogErrors = (language: string, date: string, isAuthenticated: boolean): void => {
  mockAuth.mockReturnValue(isAuthenticated);
  mockConfig.mockReturnValue({ ...testConfig });
  mockModal.mockReturnValue({
    hideModal: jest.fn(),
    showModal: jest.fn(),
  });

  const spy = jest.spyOn(global.console, 'error');

  renderWithIntl(<Provider store={store}><EditServiceDateLink wantDate={date}/></Provider>, language);

  expect(spy).not.toHaveBeenCalled();
};

describe('<EditServiceDateLink />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    it(`should not log errors in console when the scheduled service date is in the future and the user is authenticated (${language})`, (): void =>
      shouldNotLogErrors(language, itIsTomorrow, true));

    it(`should not log errors in console when the scheduled service date is in the future and the user is not authenticated (${language})`, (): void =>
      shouldNotLogErrors(language, itIsTomorrow, false));

    it(`should not log errors in console when the scheduled service date is in the past and the user is authenticated (${language})`, (): void =>
      shouldNotLogErrors(language, itIsYesterday, true));

    it(`should not log errors in console when the scheduled service date is in the past and the user is not authenticated (${language})`, (): void =>
      shouldNotLogErrors(language, itIsYesterday, false));

    it(`should not log errors in console when the scheduled service date is today and the user is authenticated (${language})`, (): void =>
      shouldNotLogErrors(language, itIsToday, true));

    it(`should not log errors in console when the scheduled service date is today and the user is not authenticated (${language})`, (): void =>
      shouldNotLogErrors(language, itIsToday, false));

    it(`should not render the link when the scheduled service date is in the future and the user is not authenticated (${language})`, (): void =>
      expectComponentToMatchSnapshot(language, itIsTomorrow, false));

    it(`should not render the link when the scheduled service date is in the past and the user is authenticated (${language})`, (): void =>
      expectComponentToMatchSnapshot(language, itIsYesterday, true));

    it(`should not render the link when the scheduled service date is in the past and the user is not authenticated (${language})`, (): void =>
      expectComponentToMatchSnapshot(language, itIsYesterday, false));

    it(`should not render the link when the scheduled service date is today and the user is authenticated (${language})`, (): void =>
      expectComponentToMatchSnapshot(language, itIsToday, true));

    it(`should not render the link when the scheduled service date is today and the user is not authenticated (${language})`, (): void =>
      expectComponentToMatchSnapshot(language, itIsToday, false));

    it(`should render the link when the scheduled service date is in the future and the user is authenticated (${language})`, (): void =>
      expectComponentToMatchSnapshot(language, itIsTomorrow, true));
  });
});
