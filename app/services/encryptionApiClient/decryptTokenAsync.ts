import { httpClient } from 'services/httpClient';

const decryptTokenAsync = async (decryptTokenUrl: string, queryParameter: string): Promise<string> => {
  try {
    const {
      data: { decryptedToken },
    } = await httpClient.get(`${decryptTokenUrl}${queryParameter}`);

    if (decryptedToken === 'NULL') {
      throw new Error('Invalid email token');
    }

    return decryptedToken;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    return '';
  }
};

export default decryptTokenAsync;
