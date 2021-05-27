import React from 'react';
import { Provider } from 'react-redux';

import { SUPPORTED_LOCALES } from 'locales';

import { createMockStore, renderWithIntl } from 'testing/utils';

import ErrorView from '../ErrorView';

const store = createMockStore();

describe('<ErrorView />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    it(`should not log errors in console when rendered in ${language}`, (): void => {
      const spy = jest.spyOn(global.console, 'error');

      renderWithIntl(<Provider store={store}><ErrorView /></Provider>, language);

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
