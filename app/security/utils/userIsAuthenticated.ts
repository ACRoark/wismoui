import useAuth from 'hooks/useAuth';

const userIsAuthenticated = (): boolean => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated;
};

export default userIsAuthenticated;
