import decryptTokenAsync from './decryptTokenAsync';
import encryptTokenAsync from './encryptTokenAsync';

interface IEncryptionApi {
  decryptTokenAsync: (url: string, queryParameter: string) => Promise<string>;
  encryptTokenAsync: (url: string, tokenValue: string) => Promise<string>;
}

const encryptionApiClient: IEncryptionApi = {
  decryptTokenAsync,
  encryptTokenAsync,
};

export default encryptionApiClient;
