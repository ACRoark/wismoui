import useAuth from 'hooks/useAuth';

import userIsAuthenticated from '../userIsAuthenticated';

jest.mock('hooks/useAuth');

const mockAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('userIsAuthenticated()', (): void => {
  it('should return false when the current user is not authenticated', (): void => {
    mockAuth.mockReturnValue({ isAuthenticated: false, loading: false });

    const result = userIsAuthenticated();

    expect(result).toBe(false);
  });

  it('should return true when the current user is authenticated', (): void => {
    mockAuth.mockReturnValue({ isAuthenticated: true, loading: false });

    const result = userIsAuthenticated();

    expect(result).toBe(true);
  });
});
