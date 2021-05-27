import { httpClient } from 'services/httpClient';

const encryptTokenAsync = async (encryptTokenUrl: string, token: string): Promise<string> => {
  try {
    const {
      data: { encryptedTokenValue },
    } = await httpClient.post(encryptTokenUrl, { tokenValue: token });

    return encryptedTokenValue;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    return '';
  }
};

export default encryptTokenAsync;
