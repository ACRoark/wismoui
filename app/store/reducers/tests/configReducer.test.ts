import { mock } from 'jest-mock-extended';

import { LoadConfigCompleted, LoadConfigFailed, LoadConfigStarted } from 'store/actions/config/configActions';

import { IApplicationConfig } from 'types';

import { initialConfigState } from 'store/defaults';
import * as ACTION_TYPES from '../../actionTypes';
import configReducer from '../configReducer';

describe('configReducer', (): void => {
  it('should clear the error field when the LOAD_CONFIG_STARTED action is dispatched', (): void => {
    const action: LoadConfigStarted = {
      type: ACTION_TYPES.LOAD_CONFIG_STARTED,
    };
    const state = mock<IApplicationConfig>();

    const updatedState = configReducer(state, action);

    expect(updatedState.error).toBeUndefined();
  });

  it('should set the error field when the LOAD_CONFIG_FAILED action is dispatched', (): void => {
    const expected = 'whatever';

    const action: LoadConfigFailed = {
      reason: expected,
      type: ACTION_TYPES.LOAD_CONFIG_FAILED,
    };
    const state = initialConfigState;

    const updatedState = configReducer(state, action);

    expect(updatedState.error).toBe(expected);
  });

  // it('should set the config field to undefined when the LOAD_CONFIG_STARTED action is dispatched', (): void => {
  //   const action: LoadConfigStarted = {
  //     type: ACTION_TYPES.LOAD_CONFIG_STARTED,
  //   };
  //   const state: IConfigState = {
  //     loading: false,
  //   };

  //   const updatedState = configReducer(state, action);

  //   expect(updatedState.config).toBe(undefined);
  // });

  // it('should set the config field when the LOAD_CONFIG_COMPLETED action is dispatched and request was successful', (): void => {
  //   const action: LoadConfigCompleted = {
  //     type: ACTION_TYPES.LOAD_CONFIG_COMPLETED,
  //   };
  //   const state: IConfigState = {
  //     loading: false,
  //   };

  //   const updatedState = configReducer(state, action);

  //   expect(updatedState.config).toBe(order);
  // });

  it('should set the loading flag to false when the LOAD_CONFIG_COMPLETED action is dispatched', (): void => {
    const action: LoadConfigCompleted = {
      data: initialConfigState,
      type: ACTION_TYPES.LOAD_CONFIG_COMPLETED,
    };
    const state: IApplicationConfig = {
      ...initialConfigState,
      loading: true,
    };

    const updatedState = configReducer(state, action);

    expect(updatedState.loading).toBe(false);
  });

  it('should set the loading flag to false when the LOAD_CONFIG_FAILED action is dispatched', (): void => {
    const action: LoadConfigFailed = {
      reason: 'whatever',
      type: ACTION_TYPES.LOAD_CONFIG_FAILED,
    };
    const state: IApplicationConfig = {
      ...initialConfigState,
      loading: true,
    };

    const updatedState = configReducer(state, action);

    expect(updatedState.loading).toBe(false);
  });

  it('should set the loading flag to true when the LOAD_CONFIG_STARTED action is dispatched', (): void => {
    const action: LoadConfigStarted = {
      type: ACTION_TYPES.LOAD_CONFIG_STARTED,
    };
    const state: IApplicationConfig = {
      ...initialConfigState,
      loading: true,
    };

    const updatedState = configReducer(state, action);

    expect(updatedState.loading).toBe(true);
  });
});
