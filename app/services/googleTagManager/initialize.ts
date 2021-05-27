import IGoogleTagManagerConfig from 'types/IGoogleTagManagerConfig';

import appendGoogleTagManagerFrame from './appendGoogleTagManagerFrame';
import appendGoogleTagManagerScript from './appendGoogleTagManagerScript';

const initialize = (config: IGoogleTagManagerConfig): void => {
  const { auth, id, preview } = config;

  // eslint-disable-next-line no-console
  console.log('[Google Tag Manager] Initializing...');

  appendGoogleTagManagerScript(id, auth, preview);
  appendGoogleTagManagerFrame(id, auth, preview);
};

export default initialize;
