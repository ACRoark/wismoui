import { RouterState } from 'connected-react-router';
import { mock } from 'jest-mock-extended';

import authenticate from 'security/authenticate';
import { IApplicationConfig, IApplicationRootState, ISearchState, IStartupState, ITrackerState } from 'types';

import * as ACTION_TYPES from '../../../actionTypes';
import authenticateUser from '../authenticateUser';
import { AuthenticationCompleted, AuthenticationFailed } from '../authenticationActions';

jest.mock('security/authenticate');

const mockAuthenticate = authenticate as jest.MockedFunction<typeof authenticate>;

const initialState: IApplicationRootState = {
  auth: { isAuthenticated: false, loading: false },
  config: mock<IApplicationConfig>(),
  router: mock<RouterState>(),
  search: mock<ISearchState>(),
  startup: mock<IStartupState>(),
  tracker: mock<ITrackerState>(),
};

describe('authenticateUser', (): void => {
  it('should dispatch the completed action when the API call returns without an error', async (): Promise<void> => {
    const action = authenticateUser();
    const success = true;
    const token = 'token';

    const completedAction: AuthenticationCompleted = {
      success,
      token,
      type: ACTION_TYPES.AUTHENTICATION_COMPLETED,
    };

    const getState = (): IApplicationRootState => initialState;

    const mockDispatch = jest.fn();

    mockAuthenticate.mockReturnValue(Promise.resolve({
      success: true,
      token: 'token',
    }));

    await action(mockDispatch, getState, {});

    expect(mockDispatch).toBeCalledWith(completedAction);
  });

  it('should dispatch the failed action when an error occurs during the API call', async (): Promise<void> => {
    const action = authenticateUser();
    const reason = 'whatever';

    const failedAction: AuthenticationFailed = {
      reason,
      type: ACTION_TYPES.AUTHENTICATION_FAILED,
    };

    const getState = (): IApplicationRootState => initialState;

    const mockDispatch = jest.fn();

    mockAuthenticate.mockReturnValue(Promise.reject(reason));

    await action(mockDispatch, getState, {});

    expect(mockDispatch).toBeCalledWith(failedAction);
  });
});
