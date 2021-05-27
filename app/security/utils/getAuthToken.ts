import getCookie from './getCookie';

const getAuthToken = (): string => getCookie('token');

export default getAuthToken;
