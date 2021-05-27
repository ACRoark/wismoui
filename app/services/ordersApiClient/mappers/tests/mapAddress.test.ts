import generate from 'testing/generators';

import mapAddress from '../mapAddress';

describe('mapAddress(...)', (): void => {
  it ('should return the full address when a valid address is provided', (): void => {
    const address = generate.address();

    const result = mapAddress(address);

    expect(result).toEqual(result);
  });
});
