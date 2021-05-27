import hasErrorFromAPI from '../hasErrorFromAPI';

describe('isOrderNotFound', (): void => {
  it('should return an empty string when the error code is unknown', (): void => {
    const errorCode = 200;

    expect(hasErrorFromAPI(errorCode)).toBe('');
  });

  it('should return ORDER_NOT_FOUND when the error code is 404', (): void => {
    const errorCode = 404;

    expect(hasErrorFromAPI(errorCode)).toBe('ORDER_NOT_FOUND');
  });

  it('should return RECAPTCHA_FAILED when the error code is 400', (): void => {
    const errorCode = 400;

    expect(hasErrorFromAPI(errorCode)).toBe('RECAPTCHA_FAILED');
  });

  const serverErrorCodes = [500, 502, 503];

  serverErrorCodes.forEach((errorCode: number): void => {
    it(`should return SERVER_UNAVAILABLE when the error code is ${errorCode}`, (): void => {
      expect(hasErrorFromAPI(errorCode)).toBe('SERVER_UNAVAILABLE');
    });
  });
});
