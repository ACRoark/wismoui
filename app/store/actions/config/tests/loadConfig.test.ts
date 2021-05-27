import { mock } from 'jest-mock-extended';

import { httpClient, IHttpClient, IHttpResponse } from 'services/httpClient';
import { initialConfigState } from 'store/defaults';
import mockState from 'testing/mockState';
import { IApplicationRootState } from 'types';

import * as ACTION_TYPES from '../../../actionTypes';
import { LoadConfigCompleted, LoadConfigFailed } from '../configActions';
import loadConfig from '../loadConfig';

jest.mock('services/httpClient');

const mockHttpClient = httpClient as jest.Mocked<IHttpClient>;

const initialState: IApplicationRootState = {
  ...mockState,
  config: initialConfigState,
};

describe('loadConfig', (): void => {
  it('should dispatch the completed action when the API call returns without an error', async (): Promise<void> => {
    const action = loadConfig();
    const result = initialConfigState;

    const completedAction: LoadConfigCompleted = {
      data: result,
      type: ACTION_TYPES.LOAD_CONFIG_COMPLETED,
    };

    const getState = (): IApplicationRootState => initialState;

    const mockDispatch = jest.fn();

    const mockResponse = {
      ...mock<IHttpResponse>(),
      data: result,
    };
    mockHttpClient.get.mockReturnValue(Promise.resolve(mockResponse));

    await action(mockDispatch, getState, {});

    expect(mockDispatch).toBeCalledWith(completedAction);
  });

  it('should dispatch the failed action when an error occurs during the API call', async (): Promise<void> => {
    const action = loadConfig();
    const reason = 'whatever';

    const failedAction: LoadConfigFailed = {
      reason,
      type: ACTION_TYPES.LOAD_CONFIG_FAILED,
    };

    const getState = (): IApplicationRootState => initialState;

    const mockDispatch = jest.fn();

    mockHttpClient.get.mockReturnValue(Promise.reject(reason));

    await action(mockDispatch, getState, {});

    expect(mockDispatch).toBeCalledWith(failedAction);
  });
});
