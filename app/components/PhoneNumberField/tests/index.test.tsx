import React from 'react';

import { SUPPORTED_LOCALES } from 'locales';

import { testConfig } from 'components/constants';
import useConfig from 'hooks/useConfig';
import useFlags from 'hooks/useFlags';
import useModal from 'hooks/useModal';
import useThunkDispatch from 'hooks/useThunkDispatch';
import { userIsAuthenticated } from 'security/utils';
import { createSnapshotWithIntl, renderWithIntl } from 'testing/utils';

import PhoneNumberField from '../index';

jest.mock('hooks/useConfig');
jest.mock('hooks/useFlags');
jest.mock('hooks/useModal');
jest.mock('hooks/useThunkDispatch');
jest.mock('security/utils');

const mockAuth = userIsAuthenticated as jest.MockedFunction<typeof userIsAuthenticated>;
const mockConfig = useConfig as jest.MockedFunction<typeof useConfig>;
const mockFlags = useFlags as jest.MockedFunction<typeof useFlags>;
const mockModal = useModal as jest.MockedFunction<typeof useModal>;
const mockThunkDispatch = useThunkDispatch as jest.MockedFunction<typeof useThunkDispatch>;

const serviceDate = '3000-01-01';

const setupMocks = (isAuthenticated: boolean): void => {

  mockAuth.mockReturnValue(isAuthenticated);
  mockConfig.mockReturnValue({ ...testConfig });
  mockFlags.mockReturnValue({
    canChangeLanguage: true,
    developerMode: true,
  });
  mockModal.mockReturnValue({
    hideModal: jest.fn(),
    showModal: jest.fn(),
  });
  mockThunkDispatch.mockReturnValue(jest.fn());
};

const expectComponentToMatchSnapshot = (phoneNumber: string | null, language: string, isAuthenticated: boolean): void => {
  setupMocks(isAuthenticated);

  const tree = createSnapshotWithIntl(<PhoneNumberField phoneNumber={phoneNumber}
                                                        serviceDate={serviceDate} />, language);

  expect(tree).toMatchSnapshot();
};

const shouldNotLogErrorsInTheConsole = (phoneNumber: string | null, language: string, isAuthenticated: boolean): void => {
  setupMocks(isAuthenticated);

  const spy = jest.spyOn(global.console, 'error');

  renderWithIntl(<PhoneNumberField phoneNumber={phoneNumber} serviceDate={serviceDate} />, language);

  expect(spy).not.toHaveBeenCalled();
};

describe('<PhoneNumberField />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {

    it(`should not log errors in console when the current user is authenticated (${language})`, (): void =>
      shouldNotLogErrorsInTheConsole('7348881234', language, true));

    it(`should not log errors in console when the current user is not authenticated (${language})`, (): void =>
      shouldNotLogErrorsInTheConsole('7348881234', language, false));

    it(`should render correctly when a valid phone number is passed in and the current user is authenticated (${language})`, (): void =>
      expectComponentToMatchSnapshot('7348881234', language, true));

    // tslint:disable-next-line: max-line-length
    it(`should render correctly when a valid phone number is passed in and the current user is not authenticated (${language})`, (): void =>
      expectComponentToMatchSnapshot('7348881234', language, false));

    // tslint:disable-next-line: max-line-length
    it(`should hide the phone number edit link when the phone number is null, the current user is authenticated (${language})`, (): void =>
      expectComponentToMatchSnapshot(null, language, true));
  });
});
