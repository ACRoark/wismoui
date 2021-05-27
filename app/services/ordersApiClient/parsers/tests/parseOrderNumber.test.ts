import generate from 'testing/generators';

import parseOrderNumber from '../parseOrderNumber';

describe('parseOrderNumber(...)', (): void => {
  it('should return the order number when the value begins with MI and has 10 characters', (): void => {
    const orderNumber = generate.orderNumber('MIMO_START');

    const result = parseOrderNumber(orderNumber);

    expect(result).toEqual(orderNumber);
  });

  it('should return the order number when the value begins with MO and has 10 characters', (): void => {
    const orderNumber = generate.orderNumber('MIMO_STOP');

    const result = parseOrderNumber(orderNumber);

    expect(result).toEqual(orderNumber);
  });

  it('should return the order number when the value begins with MT and has 10 characters', (): void => {
    const orderNumber = generate.orderNumber('MIMO_TRANSFER');

    const result = parseOrderNumber(orderNumber);

    expect(result).toEqual(orderNumber);
  });

  it('should throw an error when the value has non-numeric characters', (): void => {
    const orderNumber = generate.alphanumericString(10);

    expect((): string => parseOrderNumber(orderNumber)).toThrowError();
  });

  it('should throw an error when the value is less than 10 characters', (): void => {
    const orderNumber = generate.orderNumber().slice(0, 9);

    expect((): string => parseOrderNumber(orderNumber)).toThrowError();
  });

  it('should throw an error when teh value is more than 10 characters', (): void => {
    const orderNumber = `${generate.orderNumber()}0`;

    expect((): string => parseOrderNumber(orderNumber)).toThrowError();
  });

  it('should throw an error when the value does not begins with MI, MO or MT', (): void => {
    let prefix = generate.string(2);

    while (prefix === 'MI' || prefix === 'MO' || prefix === 'MT') {
      prefix = generate.string(2);
    }

    const orderNumber = `${prefix}${generate.randomNumber(10000000, 99999999)}`;

    expect((): string => parseOrderNumber(orderNumber)).toThrowError();
  });
});
