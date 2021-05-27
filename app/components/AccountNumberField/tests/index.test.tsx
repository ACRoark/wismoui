import React from 'react';

import { SUPPORTED_LOCALES } from 'locales';

import AccountNumberField from 'components/AccountNumberField';
import { createSnapshotWithIntl, renderWithIntl } from 'testing/utils';

const accountNumber = '111233455567';

describe('<AccountNumberField />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    it(`should not log errors in console when rendered in ${language}`, (): void => {
      const spy = jest.spyOn(global.console, 'error');

      renderWithIntl(<AccountNumberField accountNumber={accountNumber}/>, language);

      expect(spy).not.toHaveBeenCalled();
    });

    it(`should render correctly when a valid account number is passed in and the current language is ${language}`, (): void => {
      const tree = createSnapshotWithIntl(<AccountNumberField accountNumber={accountNumber}/>, language);

      expect(tree).toMatchSnapshot();
    });
  });
});
