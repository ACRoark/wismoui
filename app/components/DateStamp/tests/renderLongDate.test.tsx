import { renderWithIntl, today } from 'testing/utils';

import renderLongDate from '../renderLongDate';

import { daysOfTheWeek, languages, months } from './constants';

const date = today();

const day = date.date();
const dayOfTheWeek = date.weekday();
const month = date.month();

describe('renderLongDate()', (): void => {
  languages.forEach((language: string): void => {
    it(`should render the correct format when the current language is ${language}`, (): void => {
      const actual = renderWithIntl(renderLongDate(date), language);

      const expected = new RegExp(`${daysOfTheWeek[language][dayOfTheWeek]},\\s${months[language][month]}\\s${day}`);

      expect(actual.text()).toMatch(expected);
    });
  });
});
