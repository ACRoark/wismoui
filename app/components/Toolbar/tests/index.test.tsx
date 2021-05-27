import React from 'react';

import { SUPPORTED_LOCALES } from 'locales';

import useAuth from 'hooks/useAuth';
import useFlags from 'hooks/useFlags';
import { createSnapshotWithIntl, shallowWithIntl } from 'testing/utils';

import Toolbar from '..';

jest.mock('hooks/useAuth');
jest.mock('hooks/useFlags');

const mockAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockFlags = useFlags as jest.MockedFunction<typeof useFlags>;

const expectToolbarToMatchSnapshot = (isAuthenticated: boolean, language: string, canChangeLanguage: boolean = false): void => {
  mockAuth.mockReturnValue({ isAuthenticated, loading: false });
  mockFlags.mockReturnValue({ canChangeLanguage, developerMode: true });

  const tree = createSnapshotWithIntl(<Toolbar />, language);

  expect(tree).toMatchSnapshot();
};

describe('<Toolbar />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    it(`should not log errors in console when rendered in ${language}`, (): void => {
      const spy = jest.spyOn(global.console, 'error');

      shallowWithIntl(<Toolbar />, language);

      expect(spy).not.toHaveBeenCalled();
    });

    it(`should not render the language selector when changing languages is disabled in the config file (${language})`, (): void =>
      expectToolbarToMatchSnapshot(false, language, false));

    it(`should render the language selector when changing languages is enabled in the config file (${language})`, (): void =>
      expectToolbarToMatchSnapshot(false, language, true));

    it(`should render Login button when the current user is not authenticated (${language})`, (): void =>
      expectToolbarToMatchSnapshot(false, language));

    it(`should render Logout button when the current user is authenticated (${language})`, (): void =>
      expectToolbarToMatchSnapshot(true, language));
  });
});
