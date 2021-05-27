import React from 'react';
import { Provider } from 'react-redux';

import { SUPPORTED_LOCALES } from 'locales';

import { createMockStore, createSnapshotWithIntl, renderWithIntl } from 'testing/utils';

import NotFoundPage from '..';

describe('<App />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    it(`should not log errors in console when rendered in ${language}`, (): void => {
      const spy = jest.spyOn(global.console, 'error');

      renderWithIntl(<Provider store={createMockStore()}><NotFoundPage /></Provider>, language);

      expect(spy).not.toHaveBeenCalled();
    });

    it(`should render correctly when the current language is ${language}`, (): void => {
      const tree = createSnapshotWithIntl(<Provider store={createMockStore()}><NotFoundPage /></Provider>, language);

      expect(tree).toMatchSnapshot();
    });
  });
});
