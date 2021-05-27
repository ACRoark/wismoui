import setCookie from '../setCookie';

import { setAuthToken } from '..';

jest.mock('../setCookie');

const mockCookie = setCookie as jest.MockedFunction<typeof setCookie>;

describe('setAuthToken', (): void => {
  it('should do nothing when the token is an empty string', (): void => {
    setAuthToken('');

    expect(mockCookie).toHaveBeenCalledTimes(0);
  });

  it('should do nothing when the token is undefined', (): void => {
    setAuthToken();

    expect(mockCookie).toHaveBeenCalledTimes(0);
  });

  it('should prepend "Bearer" to the specified value when a token is provided', (): void => {
    const token = 'abc123';

    setAuthToken(token);

    expect(mockCookie).toHaveBeenCalledWith('token', `Bearer ${token}`, { days: 1, path: '/' });
  });
});
