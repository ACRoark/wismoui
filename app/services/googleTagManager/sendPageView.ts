import { Location } from 'history';

import maskUrl from './maskUrl';
import pushDataLayer from './pushDataLayer';

const sendPageView = (location: Location, pageTitle: string): void => {
  const event = {
    event: 'pageView',
    pagePath: maskUrl(location.pathname + location.search),
    pageTitle,
  };

  // eslint-disable-next-line no-console
  console.log(`[Google Tag Manager] Sending page view for '${pageTitle}...`, event);

  pushDataLayer(event);
};

export default sendPageView;
