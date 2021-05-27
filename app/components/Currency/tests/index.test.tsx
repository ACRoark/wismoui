import React from 'react';

import { SUPPORTED_LOCALES } from 'locales';

import { createSnapshotWithIntl, renderWithIntl } from 'testing/utils';

import Currency from '..';

const currencyTypes = ['CAD', 'MXN', 'USD'];

const expectComponentToMatchSnapshot = (currencyType: string, value: string | number, language: string): void => {
  const tree = createSnapshotWithIntl(<Currency type={currencyType} value={value} />, language);

  expect(tree).toMatchSnapshot();
};

describe('<Currency />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    currencyTypes.forEach((currencyType: string): void => {
      it(`should not log errors in console when the currency type is ${currencyType} and the language is ${language}`, (): void => {
        const spy = jest.spyOn(global.console, 'error');

        renderWithIntl(<Currency type="USD" value={1000} />, language);

        expect(spy).not.toHaveBeenCalled();
      });

      it(`should render correctly when currency has value of number 1000 and the currency type is ${currencyType} (${language})`, (): void =>
        expectComponentToMatchSnapshot(currencyType, 1000, language));

      it(`should render correctly when currency has value of string ".59" and the currency type is ${currencyType} (${language})`, (): void =>
        expectComponentToMatchSnapshot(currencyType, '.59', language));

      it(`should render correctly when currency has value of string "1" and the currency type is ${currencyType} (${language})`, (): void =>
        expectComponentToMatchSnapshot(currencyType, '1', language));

      it(`should render correctly when currency has value of number -1.23 and the currency type is ${currencyType} (${language})`, (): void =>
        expectComponentToMatchSnapshot(currencyType, -1.23, language));
    });
  });
});
