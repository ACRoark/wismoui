import { shallow, ShallowWrapper } from 'enzyme';
import { Moment } from 'moment';
import React from 'react';

import { renderWithIntl, today, tomorrow, yesterday } from 'testing/utils';

import DateStamp from '..';
import renderAutoDate from '../renderAutoDate';
import renderLongDate from '../renderLongDate';
import renderShortDate from '../renderShortDate';
import { DateStampFormat } from '../types';

import { languages } from './constants';

type renderFunc = (date: Moment) => React.ReactElement;

// Note: At the component level, all we know is which render function is used based on the format prop.
//       So all we test is that the component renders the same as if we call the correct render function directly.
const expectDateStampToRenderCorrectFormat = (
  date: Moment,
  language: string,
  renderExpected: renderFunc,
  format?: DateStampFormat): void => {

  const wrapper = renderWithIntl(<DateStamp format={format} value={date.toString()} />, language);

  const expected = renderWithIntl(renderExpected(date), language);

  expect(wrapper).toEqual(expected);
};

const expectDateStampToRenderAutoFormat = (date: Moment, language: string, format?: DateStampFormat): void =>
  expectDateStampToRenderCorrectFormat(date, language, renderAutoDate, format);

const expectDateStampToRenderLongFormat = (date: Moment, language: string, format?: DateStampFormat): void =>
  expectDateStampToRenderCorrectFormat(date, language, renderLongDate, format);

const expectDateStampToRenderShortFormat = (date: Moment, language: string, format?: DateStampFormat): void =>
  expectDateStampToRenderCorrectFormat(date, language, renderShortDate, format);

const expectNoErrorsInTheConsole = (date: Moment, language: string, format?: DateStampFormat): void => {
  const spy = jest.spyOn(global.console, 'error');

  renderWithIntl(<DateStamp format={format} value={date.toString()} />, language);

  expect(spy).not.toHaveBeenCalled();
};

describe('DateStamp Component', (): void => {
  languages.forEach((language: string): void => {
    it(`should not log errors in console when the date is in the past, the language is ${language} and the format is auto`, (): void =>
      expectNoErrorsInTheConsole(yesterday(), language, 'auto'));

    it(`should not log errors in console when the date is in the past, the language is ${language} and the format is long`, (): void =>
      expectNoErrorsInTheConsole(yesterday(), language, 'long'));

    it(`should not log errors in console when the date is in the past, the language is ${language} and the format is short`, (): void =>
      expectNoErrorsInTheConsole(yesterday(), language, 'short'));

    it(`should not log errors in console when the date is in the past, the language is ${language} and the format is undefined`, (): void =>
      expectNoErrorsInTheConsole(yesterday(), language));

    it(`should not log errors in console when the date is today, the language is ${language} and the format is auto`, (): void =>
      expectNoErrorsInTheConsole(today(), language, 'auto'));

    it(`should not log errors in console when the date is today, the language is ${language} and the format is long`, (): void =>
      expectNoErrorsInTheConsole(today(), language, 'long'));

    it(`should not log errors in console when the date is today, the language is ${language} and the format is short`, (): void =>
      expectNoErrorsInTheConsole(today(), language, 'short'));

    it(`should not log errors in console when the date is today, the language is ${language} and the format is undefined`, (): void =>
      expectNoErrorsInTheConsole(today(), language));

    it(`should not log errors in console when the date is tomorrow, the language is ${language} and the format is auto`, (): void =>
      expectNoErrorsInTheConsole(tomorrow(), language, 'auto'));

    it(`should not log errors in console when the date is tomorrow, the language is ${language} and the format is long`, (): void =>
      expectNoErrorsInTheConsole(tomorrow(), language, 'long'));

    it(`should not log errors in console when the date is tomorrow, the language is ${language} and the format is short`, (): void =>
      expectNoErrorsInTheConsole(tomorrow(), language, 'short'));

    it(`should not log errors in console when the date is tomorrow, the language is ${language} and the format is undefined`, (): void =>
      expectNoErrorsInTheConsole(tomorrow(), language));

    it(`should render the correct format when the date is in the past, the language is ${language} and the format is auto`, (): void =>
      expectDateStampToRenderAutoFormat(yesterday(), language, 'auto'));

    it(`should render the correct format when the date is in the past, the language is ${language} and the format is long`, (): void =>
      expectDateStampToRenderLongFormat(yesterday(), language, 'long'));

    it(`should render the correct format when the date is in the past, the language is ${language} and the format is short`, (): void =>
      expectDateStampToRenderShortFormat(yesterday(), language, 'short'));

    it(`should render the correct format when the date is in the past, the language is ${language} and the format is undefined`, (): void =>
      expectDateStampToRenderAutoFormat(yesterday(), language));

    it(`should render the correct format when the date is today, the language is ${language} and the format is auto`, (): void =>
      expectDateStampToRenderAutoFormat(today(), language, 'auto'));

    it(`should render the correct format when the date is today, the language is ${language} and the format is long`, (): void =>
      expectDateStampToRenderLongFormat(today(), language, 'long'));

    it(`should render the correct format when the date is today, the language is ${language} and the format is short`, (): void =>
      expectDateStampToRenderShortFormat(today(), language, 'short'));

    it(`should render the correct format when the date is today, the language is ${language} and the format is undefined`, (): void =>
      expectDateStampToRenderAutoFormat(today(), language));

    it(`should render the correct format when the date is tomorrow, the language is ${language} and the format is auto`, (): void =>
      expectDateStampToRenderAutoFormat(tomorrow(), language, 'auto'));

    it(`should render the correct format when the date is tomorrow, the language is ${language} and the format is long`, (): void =>
      expectDateStampToRenderLongFormat(tomorrow(), language, 'long'));

    it(`should render the correct format when the date is tomorrow, the language is ${language} and the format is short`, (): void =>
      expectDateStampToRenderShortFormat(tomorrow(), language, 'short'));

    it(`should render the correct format when the date is tomorrow, the language is ${language} and the format is undefined`, (): void =>
      expectDateStampToRenderAutoFormat(tomorrow(), language));

    it(`should throw an error when the date is invalid (${language})`, (): void => {
      // tslint:disable-next-line: no-any
      expect((): ShallowWrapper<any> => shallow(<DateStamp value="19000100"/>)).toThrowError();
    });
  });
});
