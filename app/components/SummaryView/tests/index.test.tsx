import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { SUPPORTED_LOCALES } from 'locales';
import generate from 'testing/generators';
import { shallowWithIntl } from 'testing/utils';

import SummaryView from '..';

const expectNoConsoleErrors = (language: string): void => {
  const results = generate.orderSearchResults();

  const spy = jest.spyOn(global.console, 'error');

  shallowWithIntl(<Router><SummaryView results={results} /></Router>, language);

  expect(spy).not.toHaveBeenCalled();
};

describe('<SummaryView />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    it(`should not log errors in console when rendered and the current language is ${language}`, (): void => expectNoConsoleErrors(language));
  });
});
