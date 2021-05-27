import { RouterState } from 'connected-react-router';
import { mock } from 'jest-mock-extended';

import { IApplicationConfig, IApplicationRootState, IAuthenticationState, ISearchState, IStartupState } from 'types';

import * as ACTION_TYPES from '../../../actionTypes';
import resetTracker from '../resetTracker';
import { ResetTrackerState } from '../trackerActions';

const initialState: IApplicationRootState = {
  auth: mock<IAuthenticationState>(),
  config: mock<IApplicationConfig>(),
  router: mock<RouterState>(),
  search: mock<ISearchState>(),
  startup: mock<IStartupState>(),
  tracker: {
    loading: false,
  },
};

describe('getOrder', (): void => {
  it('should dispatch the reset action', async (): Promise<void> => {
    const action = resetTracker();

    const resetAction: ResetTrackerState = {
      type: ACTION_TYPES.RESET_TRACKER_STATE,
    };

    const getState = (): IApplicationRootState => initialState;

    const mockDispatch = jest.fn();

    await action(mockDispatch, getState, {});

    expect(mockDispatch).toBeCalledWith(resetAction);
  });
});
