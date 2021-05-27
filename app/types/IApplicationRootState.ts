import { RouterState } from 'connected-react-router';

import IApplicationConfig from './IApplicationConfig';
import IAuthenticationState from './IAuthenticationState';
import ISearchState from './ISearchState';
import IStartupState from './IStartupState';
import ITrackerState from './ITrackerState';

interface IApplicationRootState {
  auth: IAuthenticationState;
  config: IApplicationConfig;
  // TODO: locale: ILocalizationState;
  router: RouterState;
  search: ISearchState;
  startup: IStartupState;
  tracker: ITrackerState;
}

export default IApplicationRootState;
