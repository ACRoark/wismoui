import generate from 'testing/generators';

import parsePhoneNumber from '../parsePhoneNumber';

describe('parsePhoneNumber(...)', (): void => {
  it('should return the phone number when the value has 10 characters', (): void => {
    const phoneNumber = generate.numericString(10);

    const result = parsePhoneNumber(phoneNumber);

    expect(result).toEqual(phoneNumber);
  });

  it('should return the phone number when the value has 7 characters', (): void => {
    const phoneNumber = generate.numericString(7);

    const result = parsePhoneNumber(phoneNumber);

    expect(result).toEqual(phoneNumber);
  });

  it('should throw an error when the value has non-numeric characters', (): void => {
    const phoneNumber = generate.alphanumericString(10);

    expect((): string => parsePhoneNumber(phoneNumber)).toThrowError();
  });

  it('should throw an error when the value is between 7 and 10 characters', (): void => {
    const phoneNumber = generate.randomNumber(10000000, 999999999).toString();

    expect((): string => parsePhoneNumber(phoneNumber)).toThrowError();
  });

  it('should throw an error when the value is less than 7 characters', (): void => {
    const phoneNumber = generate.randomNumber(0, 999999).toString();

    expect((): string => parsePhoneNumber(phoneNumber)).toThrowError();
  });

  it('should throw an error when the value is more than 10 characters', (): void => {
    const phoneNumber = `${generate.phoneNumber()}0`;

    expect((): string => parsePhoneNumber(phoneNumber)).toThrowError();
  });
});
