import { render } from 'enzyme';
import React from 'react';

import { createSnapshot } from 'testing/utils';
import IAddress from 'types/IAddress';

import Address from '..';
import AddressFormat, { AddressFormats } from '../AddressFormat';

const expectNoConsoleErrors = (format: AddressFormat, zipCode: string): void => {
  const spy = jest.spyOn(global.console, 'error');

  const address: IAddress = {
    city: 'Bloomfield',
    line1: '123 Main St',
    line2: 'Apt. A',
    state: 'MI',
    zip: zipCode,
  };

  render(<Address format={format} address={address} />);

  expect(spy).not.toHaveBeenCalled();
};

const expectAddressToMatchSnapshot = (format: AddressFormat, zipCode: string): void => {
  const address: IAddress = {
    city: 'Bloomfield',
    line1: '123 Main St',
    line2: 'Apt. A',
    state: 'MI',
    zip: zipCode,
  };

  const tree = createSnapshot(<Address format={format} address={address} />);

  expect(tree).toMatchSnapshot();
};

describe('Address Component', (): void => {
  const formats = AddressFormats;

  formats.map((format: AddressFormat): void => {
    it('should not log errors in console when rendered', (): void => {
      expectNoConsoleErrors(format, '48301');
    });

    it(`should render correctly when format is "${format}"`, (): void => {
      expectAddressToMatchSnapshot(format, '48301');
    });

    it(`should render correctly when format is "${format}", and zip has more than 5 digits`, (): void => {
      expectAddressToMatchSnapshot(format, '48301-1234');
    });
  });
});
