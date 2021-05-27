import googleTagManager from 'services/googleTagManager';
import { initialConfigState } from 'store/defaults';
import mockState from 'testing/mockState';
import { IApplicationRootState } from 'types';

import sendPageView from '../sendPageView';

jest.mock('services/googleTagManager');

const mockTagManager = googleTagManager as jest.Mocked<typeof googleTagManager>;

describe('sendPageView', (): void => {
  const mockDispatch = jest.fn();
  const page = 'whatever';

  it('should do nothing when config is not defined', async (): Promise<void> => {
    const action = sendPageView(page);
    const state: IApplicationRootState = {
      ...mockState,
      config: {
        ...initialConfigState,
        googleTagManagerConfig: undefined,
      },
    };

    const getState = (): IApplicationRootState => state;

    await action(mockDispatch, getState, {});

    expect(mockTagManager.sendPageView).toBeCalledTimes(0);
  });

  it('should send the page name to the tag manager when the config settings are defined', async (): Promise<void> => {
    const action = sendPageView(page);
    const state: IApplicationRootState = {
      ...mockState,
      config: {
        ...initialConfigState,
      },
    };

    const getState = (): IApplicationRootState => state;

    await action(mockDispatch, getState, {});

    expect(mockTagManager.sendPageView).toBeCalledTimes(1);
    expect(mockTagManager.sendPageView).toBeCalledWith(state.router.location, page);
  });
});
