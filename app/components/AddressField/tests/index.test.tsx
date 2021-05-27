import React from 'react';

import { SUPPORTED_LOCALES } from 'locales';

import { createSnapshotWithIntl, renderWithIntl } from 'testing/utils';
import IAddress from 'types/IAddress';

import AddressField from '..';

describe('<AddressField />', (): void => {
  let address: IAddress;
  const languages = Object.keys(SUPPORTED_LOCALES);

  beforeEach((): void => {
    address = {
      city: 'Anytown',
      line1: '1234 That Street',
      line2: null,
      state: 'MI',
      zip: '12345-1234',
    };
  });

  languages.forEach((language: string): void => {
      it(`should not log errors in console when rendered in ${language}`, (): void => {
        const spy = jest.spyOn(global.console, 'error');

        renderWithIntl(<AddressField address={address} />, language);

        expect(spy).not.toHaveBeenCalled();
      });

      it(`should render correctly when a valid address is passed in and the current language is ${language}`, (): void => {
        const tree = createSnapshotWithIntl(<AddressField address={address} />, language);

        expect(tree).toMatchSnapshot();
      });
  });
});
