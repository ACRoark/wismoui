import React from 'react';
import { FormattedMessage } from 'react-intl';

import { SUPPORTED_LOCALES } from 'locales';

import getTime from '../getTime';
import messages from '../messages';

const slotTypes = {
    AM: {en: '8 a.m. - 12 p.m.', es: '8 a.m. - 12 p.m.'},
    PM: {en:'12 p.m. - 4:30 p.m.', es:'12 p.m. - 4:30 p.m.'},
    AH: {en:'4:30 p.m. - 8 p.m.', es:'4:30 p.m. - 8 p.m.'},
    AN: {en:'', es: ''}
};

describe('getTime', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void=> {
    Object.entries(slotTypes).forEach(([slotType, valueObj]) => {
      Object.entries(valueObj).forEach(([lang, valueStr]) => {
        it(`should return the string ${valueStr} when the slotType is ${slotType} and language is ${lang}`,(): void => {
          expect(getTime(slotType)).toEqual(<FormattedMessage {...messages[`${slotType}_appointment`]}/>);
        });
      });
    });

    it(`should return an empty string when the slotType is null and language is ${language}`,(): void => {
      expect(getTime(null)).toEqual('');
    });
  });
});
