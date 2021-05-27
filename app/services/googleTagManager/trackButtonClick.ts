import { Location } from 'history';

import maskUrl from './maskUrl';
import pushDataLayer from './pushDataLayer';

const trackButtonClick = (location: Location, dataTrackDetail: string, dataTrackSubAction: string): void => {
  const event = {
    dataTrack: 'mimo',
    dataTrackAction: 'click',
    dataTrackDetail,
    dataTrackSubAction,
    event: 'pageView',
    pagePath: maskUrl(location.pathname + location.search),
  };

  // eslint-disable-next-line no-console
  console.log(`[Google Tag Manager] Sending tags for button clicks`, event);

  pushDataLayer(event);
};

export default trackButtonClick;
