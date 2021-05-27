import { renderWithIntl, today } from 'testing/utils';

import renderShortDate from '../renderShortDate';

import { languages } from './constants';

const date = today();

const day = date.date().toString().padStart(2, '0');
const month = (date.month() + 1).toString().padStart(2, '0');
const year = date.year().toString().slice(2);

const expected = {
  en: `${month}/${day}/${year}`,
  es: `${day}/${month}/${year}`,
};

describe('renderShortDate()', (): void => {
  languages.forEach((language: string): void => {
    it(`should render the correct format when the current language is ${language}`, (): void => {
      const actual = renderWithIntl(renderShortDate(date), language);

      expect(actual.text()).toEqual(expected[language]);
    });
  });
});
