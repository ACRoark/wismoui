import { RouterState } from 'connected-react-router';
import { mock } from 'jest-mock-extended';

import {
  IApplicationConfig,
  IApplicationRootState,
  IAuthenticationState,
  ISearchState,
  IStartupState,
  ITrackerState,
} from 'types';

const mockState: IApplicationRootState = {
  auth: mock<IAuthenticationState>(),
  config: mock<IApplicationConfig>(),
  router: mock<RouterState>(),
  search: mock<ISearchState>(),
  startup: mock<IStartupState>(),
  tracker: mock<ITrackerState>(),
};

export default mockState;
