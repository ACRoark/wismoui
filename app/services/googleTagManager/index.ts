import initialize from './initialize';
import sendPageView from './sendPageView';
import trackButtonClick from './trackButtonClick';
import trackServiceFailure from './trackServiceFailure';
import trackServiceResponse from './trackServiceResponse';

const googleTagManager = {
  initialize,
  sendPageView,
  trackButtonClick,
  trackServiceFailure,
  trackServiceResponse,
};

export default googleTagManager;
