import { RouterState } from 'connected-react-router';
import { mock } from 'jest-mock-extended';

import createFakeSearchResult from 'components/createFakeSearchResult';
import ordersApiClient from 'services/ordersApiClient';
import { IApplicationConfig, IApplicationRootState, IAuthenticationState, IStartupState, ITrackerState } from 'types';
import IOrderSearchResults from 'types/IOrderSearchResults';

import * as ACTION_TYPES from '../../../actionTypes';
import searchOrders from '../searchOrders';
import { OrderSearchCompleted, OrderSearchFailed } from '../searchOrdersActions';

jest.mock('services/ordersApiClient');

const mockApiClient = ordersApiClient as jest.Mocked<typeof ordersApiClient>;

const initialState: IApplicationRootState = {
  auth: mock<IAuthenticationState>(),
  config: mock<IApplicationConfig>(),
  router: mock<RouterState>(),
  search: {
    loading: false,
  },
  startup: mock<IStartupState>(),
  tracker: mock<ITrackerState>(),
};

describe('searchOrders', (): void => {
  it('should dispatch the completed action when the API call returns without an error', async (): Promise<void> => {
    const action = searchOrders();
    const results: IOrderSearchResults = {
      counts: { closed: 0, open: 0, total: 0 },
      orders: [
        createFakeSearchResult('MI12345678'),
      ],
    };

    const completedAction: OrderSearchCompleted = {
      results: results.orders,
      type: ACTION_TYPES.ORDER_SEARCH_COMPLETED,
    };

    const getState = (): IApplicationRootState => initialState;

    const mockDispatch = jest.fn();

    mockApiClient.searchOrdersAsync.mockReturnValue(Promise.resolve(results));

    await action(mockDispatch, getState, {});

    expect(mockDispatch).toBeCalledWith(completedAction);
  });

  it('should dispatch the failed action when an error occurs during the API call', async (): Promise<void> => {
    const action = searchOrders();
    const reason = 'whatever';

    const failedAction: OrderSearchFailed = {
      reason,
      type: ACTION_TYPES.ORDER_SEARCH_FAILED,
    };

    const getState = (): IApplicationRootState => initialState;

    const mockDispatch = jest.fn();

    mockApiClient.searchOrdersAsync.mockReturnValue(Promise.reject(reason));

    await action(mockDispatch, getState, {});

    expect(mockDispatch).toBeCalledWith(failedAction);
  });
});
