import { RouterState } from 'connected-react-router';
import { mock } from 'jest-mock-extended';

import createFakeOrder from 'components/createFakeOrder';
import ordersApiClient from 'services/ordersApiClient';
import { IApplicationConfig, IApplicationRootState, IAuthenticationState, ISearchState, IStartupState } from 'types';

import * as ACTION_TYPES from '../../../actionTypes';
import getOrder from '../getOrder';
import { GetOrderCompleted, GetOrderFailed } from '../getOrderActions';

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

describe('getOrder', (): void => {
  const orderNumber = 'MI12345678';

  it('should dispatch the completed action when the API call returns without an error', async (): Promise<void> => {
    const action = getOrder(orderNumber);
    const result = createFakeOrder(orderNumber);

    const completedAction: GetOrderCompleted = {
      order: result,
      type: ACTION_TYPES.GET_ORDER_COMPLETED,
    };

    const getState = (): IApplicationRootState => initialState;

    const mockDispatch = jest.fn();

    mockApiClient.getOrderAsync.mockReturnValue(Promise.resolve(result));

    await action(mockDispatch, getState, {});

    expect(mockDispatch).toBeCalledWith(completedAction);
  });

  it('should dispatch the failed action when an error occurs during the API call', async (): Promise<void> => {
    const action = getOrder(orderNumber);
    const reason = 'whatever';

    const failedAction: GetOrderFailed = {
      reason,
      type: ACTION_TYPES.GET_ORDER_FAILED,
    };

    const getState = (): IApplicationRootState => initialState;

    const mockDispatch = jest.fn();

    mockApiClient.getOrderAsync.mockReturnValue(Promise.reject(reason));

    await action(mockDispatch, getState, {});

    expect(mockDispatch).toBeCalledWith(failedAction);
  });
});
