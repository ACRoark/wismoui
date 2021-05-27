import { IHttpError } from 'services/httpClient';

import maskUrl from './maskUrl';

const trackServiceFailure = (url: string, method: string, error: IHttpError): void => {
  const maskedUrl = maskUrl(url);

  // eslint-disable-next-line no-console
  console.log(`[trackServiceFailure] ${method} ${maskedUrl}`, error);
};

export default trackServiceFailure;
