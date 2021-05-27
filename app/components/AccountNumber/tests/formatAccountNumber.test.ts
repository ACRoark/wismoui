import generate from 'testing/generators/generate';

import formatAccountNumber from '../formatAccountNumber';

describe('formatAccountNumber()', (): void => {
  it('should return the correctly value when passed a valid account number', (): void => {
    const accountNumber = '111122233334';

    const result = formatAccountNumber(accountNumber);

    expect(result).toEqual('1111 222 3333 4');
  });

  it('should throw an error when account number is less than 12 digits', (): void => {
    const accountNumber = generate.randomNumber(1, 99999999999).toString();

    const action = (): string => formatAccountNumber(accountNumber);

    expect(action).toThrowError();
  });

  it('should throw an error when account number value contains alpha characters', (): void => {
    const accountNumber = generate.alphanumericString(12);

    const action = (): string => formatAccountNumber(accountNumber);

    expect(action).toThrowError();
  });

  it('should throw an error when account number is more than 12 digits', (): void => {
    const accountNumber = `${generate.numericString(12)}9`;

    const action = (): string => formatAccountNumber(accountNumber);

    expect(action).toThrowError();
  });
});
