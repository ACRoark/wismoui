import { RouterState } from 'connected-react-router';
import { mock } from 'jest-mock-extended';

import createFakeOrder from 'components/createFakeOrder';
import ordersApiClient from 'services/ordersApiClient';
import { IApplicationConfig, IApplicationRootState, IAuthenticationState, ISearchState, IStartupState } from 'types';

import * as ACTION_TYPES from '../../../actionTypes';
import findOrder from '../findOrder';
import { FindOrderCompleted, FindOrderFailed } from '../findOrderActions';

jest.mock('services/ordersApiClient');

const mockApiClient = ordersApiClient as jest.Mocked<typeof ordersApiClient>;

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

describe('findOrder', (): void => {
  const name = 'Smith';
  const orderNumber = 'MI12345678';
  const recaptchaToken = 'fakeRecaptchaTokenString';

  it('should dispatch the completed action when the API call returns without an error', async (): Promise<void> => {
    const action = findOrder(orderNumber, name, recaptchaToken);
    const result = createFakeOrder(orderNumber);

    const completedAction: FindOrderCompleted = {
      order: result,
      type: ACTION_TYPES.FIND_ORDER_COMPLETED,
    };

    const getState = (): IApplicationRootState => initialState;

    const mockDispatch = jest.fn();

    mockApiClient.findOrderAsync.mockReturnValue(Promise.resolve(result));

    await action(mockDispatch, getState, {});

    expect(mockDispatch).toBeCalledWith(completedAction);
  });

  it('should dispatch the failed action when an error occurs during the API call', async (): Promise<void> => {
    const action = findOrder(orderNumber, name, recaptchaToken);
    const reason = 'whatever';

    const failedAction: FindOrderFailed = {
      reason,
      type: ACTION_TYPES.FIND_ORDER_FAILED,
    };

    const getState = (): IApplicationRootState => initialState;

    const mockDispatch = jest.fn();

    mockApiClient.findOrderAsync.mockReturnValue(Promise.reject(reason));

    await action(mockDispatch, getState, {});

    expect(mockDispatch).toBeCalledWith(failedAction);
  });
});
