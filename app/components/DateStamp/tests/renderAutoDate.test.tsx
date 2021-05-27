import { Moment } from 'moment';
import React from 'react';

import { renderWithIntl, today, tomorrow, yesterday } from 'testing/utils';

import renderAutoDate from '../renderAutoDate';
import renderLongDate from '../renderLongDate';
import renderShortDate from '../renderShortDate';

import { languages } from './constants';

type renderFunc = (date: Moment) => React.ReactElement;

// Note: At this level, all we know is which render function is used based on the date rule.
//       So all we test is that the function returns the same value as if we call the correct render function directly.
const expectFunctionToReturnTheCorrectFormat = (
  date: Moment,
  language: string,
  renderExpected: renderFunc): void => {

  const actual = renderWithIntl(renderAutoDate(date), language);

  const expected = renderWithIntl(renderExpected(date), language);

  expect(actual).toEqual(expected);
};

const expectFunctionToReturnTheLongFormat = (date: Moment, language: string): void =>
  expectFunctionToReturnTheCorrectFormat(date, language, renderLongDate);

const expectFunctionToReturnTheShortFormat = (date: Moment, language: string): void =>
  expectFunctionToReturnTheCorrectFormat(date, language, renderShortDate);

describe('renderAutoDate()', (): void => {
  languages.forEach((language: string): void => {
    it(`should render the short format when the date is in the past and the current language is ${language}`, (): void =>
      expectFunctionToReturnTheShortFormat(yesterday(), language));

    it(`should render the long format when the date is today and the current language is ${language}`, (): void =>
      expectFunctionToReturnTheLongFormat(today(), language));

    it(`should render the long format when the date is in the future and the current language is ${language}`, (): void =>
      expectFunctionToReturnTheLongFormat(tomorrow(), language));
  });
});
