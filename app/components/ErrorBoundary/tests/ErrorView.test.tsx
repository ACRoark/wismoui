import React from 'react';
import { Provider } from 'react-redux';

import { SUPPORTED_LOCALES } from 'locales';

import { createMockStore, createSnapshotWithIntl, renderWithIntl } from 'testing/utils';

import ErrorView from '../ErrorView';

const store = createMockStore();

describe('<ErrorView />', (): void => {
  const error = new Error('I am an error');
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    it(`should not log errors in console when rendered in ${language}`, (): void => {
      const spy = jest.spyOn(global.console, 'error');

      renderWithIntl(<Provider store={store}><ErrorView errorInfo={error}/></Provider>, language);

      expect(spy).not.toHaveBeenCalled();
    });

    it(`should render correctly when given error info in ${language}`, (): void => {
      const tree = createSnapshotWithIntl(<Provider store={store}><ErrorView errorInfo={error}/></Provider>, language);

      expect(tree).toMatchSnapshot();
    });
  });
});
