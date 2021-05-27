import { IAuthenticationResult } from './types';
import { setAuthToken } from './utils';

interface IGetTokenResponse {
  apiVersion?: number;
  callId?: string;
  context?: string;
  errorCode: number;
  errorMessage: string;
  id_token?: string;
  ignoredFields?: string;
  operation: string;
  status: string;
  statusMessage: string;
  time?: string;
}

const authenticate = (): Promise<IAuthenticationResult> =>
  // tslint:disable-next-line: typedef
  new Promise<IAuthenticationResult>((resolve) => {
    const handleGetTokenResponse = (response: IGetTokenResponse): void => {
      switch (response.status) {
        case 'OK':
          setAuthToken(response.id_token);

          resolve({
            success: true,
          });
          break;
        default:
          // eslint-disable-next-line no-console
          console.warn(`[WISMO UI] Failed to retrieve JWT: ${response.statusMessage}`);

          resolve({ success: false });
      }
    };

    // Gigya is the Identity Provider.
    // We pull in their SDK in the index.html file and use the window object to access it here.
    // Authentication takes place in the newlook website (or using the /public/login.htmla page locally).
    // @ts-ignore
    window.gigya.accounts.getJWT({
      callback: handleGetTokenResponse,
      expiration: 1800,
    });
  });

export default authenticate;
