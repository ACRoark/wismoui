import setCookie from './setCookie';

const setAuthToken = (value?: string): void => {
  if (value) {
    setCookie('token', `Bearer ${value}`, { days: 1, path: '/' });
  }
};

export default setAuthToken;
