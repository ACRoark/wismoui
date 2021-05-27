/**
 *
 * Tests for ColumnLayout
 *
 */
import React from 'react';

import { SUPPORTED_LOCALES } from 'locales';

import { shallowWithIntl } from 'testing/utils';

import ColumnLayout from '..';

describe('<ColumnLayout />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    it(`should not log errors in console when rendered in ${language}`, (): void => {
      const spy = jest.spyOn(global.console, 'error');

      shallowWithIntl(<ColumnLayout />, language);

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
