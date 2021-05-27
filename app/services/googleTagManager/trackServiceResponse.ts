import { IHttpResponse } from 'services/httpClient';

import maskUrl from './maskUrl';

const trackServiceResponse = (url: string, method: string, response: IHttpResponse): void => {
  const maskedUrl = maskUrl(url);

  // eslint-disable-next-line no-console
  console.log(`[trackServiceResponse] ${method} ${maskedUrl}`, response);
};

export default trackServiceResponse;
