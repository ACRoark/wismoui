import generate from 'testing/generators';
import { IAddress } from 'types';

import formatAddress from '../formatAddress';

describe('formatAddress()', (): void => {
  it('when format is block and line 2 is blank', (): void => {
    const address: IAddress = {
          ...generate.address(),
          line2: '',
        };

    const result = formatAddress(address, 'block');

    const expected = `${address.line1}\n${address.city}, ${address.state} ${address.zip.indexOf('-') > -1 ? address.zip.substring(0, address.zip.indexOf('-')) : address.zip}`;

    expect(result).toEqual(expected);
  });

  it('when format is block and line 2 is null', (): void => {
    const address: IAddress = {
      ...generate.address(),
      line2: null,
    };

    const result = formatAddress(address, 'block');

    const expected = `${address.line1}\n${address.city}, ${address.state} ${address.zip.indexOf('-') > -1 ? address.zip.substring(0, address.zip.indexOf('-')) : address.zip}`;

    expect(result).toEqual(expected);
  });

  it('when format is block and line 2 is provided', (): void => {
    const address: IAddress = generate.address();

    const result = formatAddress(address, 'block');

    const expected = `${address.line1}, ${address.line2}\n${address.city}, ${address.state} ${address.zip.indexOf('-') > -1 ? address.zip.substring(0, address.zip.indexOf('-')) : address.zip}`;

    expect(result).toEqual(expected);
  });

  it('when format is street and line 2 is blank', (): void => {
    const address: IAddress = {
      ...generate.address(),
      line2: '',
    };

    const result = formatAddress(address, 'street');

    const expected = address.line1;

    expect(result).toEqual(expected);
  });

  it('when format is street and line 2 is null', (): void => {
    const address: IAddress = {
      ...generate.address(),
      line2: null,
    };

    const result = formatAddress(address, 'street');

    const expected = address.line1;

    expect(result).toEqual(expected);
  });

  it('when format is street and line 2 is provided', (): void => {
    const address: IAddress = generate.address();

    const result = formatAddress(address, 'street');

    const expected = `${address.line1}, ${address.line2}`;

    expect(result).toEqual(expected);
  });
});
