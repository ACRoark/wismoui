import React from 'react';

import { SUPPORTED_LOCALES } from 'locales';

import { createSnapshotWithIntl, renderWithIntl } from 'testing/utils';

import Tabs from '..';

const selectionChanged = jest.fn();

describe('<Tabs />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    it(`should not log errors in console when rendered in ${language}`, (): void => {
      const spy = jest.spyOn(global.console, 'error');

      renderWithIntl(<Tabs selectionChanged={selectionChanged} />, language);

      expect(spy).not.toHaveBeenCalled();
    });

    it(`should render correctly when the current language is ${language}`, (): void => {
      const tree = createSnapshotWithIntl(<Tabs selectionChanged={selectionChanged} />, language);

      expect(tree).toMatchSnapshot();
    });
  });
});
