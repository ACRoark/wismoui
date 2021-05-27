import React from 'react';
import { Provider } from 'react-redux';

import { SUPPORTED_LOCALES } from 'locales';

import { testConfig } from 'components/constants';
import createFakeOrder from 'components/createFakeOrder';
import getBannerNotification from 'components/ServiceRequestBanner/getBannerNotification';
import { IMessage } from 'components/ServiceRequestBanner/types';
import useConfig from 'hooks/useConfig';
import useModal from 'hooks/useModal';
import {createMockStore, createSnapshotWithIntl, renderWithIntl} from 'testing/utils';

import ErrorBanner from '../index';

jest.mock('hooks/useConfig');
jest.mock('hooks/useModal');

const canceledStartService = createFakeOrder('MI12345677');
const fakeStartService = createFakeOrder('MI89012345');
const fakeStopService = createFakeOrder('MO89012345');
const fakeServiceDelayed = createFakeOrder('MO34567890');
const fakeServiceCallDTE = createFakeOrder('MO45678901');
const fakeServiceRescheduled = createFakeOrder('MO56789012');
const fakeServicePartialCompletion = createFakeOrder('MO67890123');
const mockConfig = useConfig as jest.MockedFunction<typeof useConfig>;
const mockModal = useModal as jest.MockedFunction<typeof useModal>;
const store = createMockStore();

const expectComponentToMatchSnapshot = (language: string, message: IMessage): void => {
  mockConfig.mockReturnValue({ ...testConfig });
  mockModal.mockReturnValue({
    hideModal: jest.fn(),
    showModal: jest.fn(),
  });

  const tree = createSnapshotWithIntl(
    <Provider store={store}>
      <ErrorBanner message={message} />
    </Provider>, language);

  expect(tree).toMatchSnapshot();
};

const shouldNotLogErrors = (language: string, message: IMessage): void => {
  mockConfig.mockReturnValue({ ...testConfig });
  mockModal.mockReturnValue({
    hideModal: jest.fn(),
    showModal: jest.fn(),
  });

  const spy = jest.spyOn(global.console, 'error');

  renderWithIntl(
    <Provider store={store}>
      <ErrorBanner message={message} />
    </Provider>, language);

  expect(spy).not.toHaveBeenCalled();
};

describe('<ErrorBanner />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    it(`should not log errors in console when rendered with a Start Service request and the current language is ${language}`, (): void => {
      const { message } = getBannerNotification(fakeStartService.orderRequests[0]);

      shouldNotLogErrors(language, message);
    });

    it(`should not log errors in console when rendered with a Stop Service request and the current language is ${language}`, (): void => {
      const { message } = getBannerNotification(fakeStopService.orderRequests[0]);

      shouldNotLogErrors(language, message);
    });

    it(`should render correctly when given a Start Service request with an unresolved verification step and the current language is ${language}`, (): void => {
      const { message } = getBannerNotification(fakeStartService.orderRequests[0]);

      expectComponentToMatchSnapshot(language, message);
    });

    it(`should render correctly when given a Stop Service request with an unresolved verification step and the current language is ${language}`, (): void => {
      const { message } = getBannerNotification(fakeStopService.orderRequests[0]);

      expectComponentToMatchSnapshot(language, message);
    });

    it(`should render correctly when given the Service request with a delayed status and the current language is ${language}`, (): void => {
      const { message } = getBannerNotification(fakeServiceDelayed.orderRequests[0]);

      expectComponentToMatchSnapshot(language, message);
    });

    it(`should render correctly when given a Start Service request with a 'CANCELED' status and the current language is ${language}`, (): void => {
      const { message } = getBannerNotification(canceledStartService.orderRequests[0]);

      expectComponentToMatchSnapshot(language, message);
    });

    it(`should render correctly when given the Service request with a call dte status and the current language is ${language}`, (): void => {
      const { message } = getBannerNotification(fakeServiceCallDTE.orderRequests[0]);

      expectComponentToMatchSnapshot(language, message);
    });

    it(`should render correctly when given the Service request with a rescheduled status and the current language is ${language}`, (): void => {
      const { message } = getBannerNotification(fakeServiceRescheduled.orderRequests[0]);

      expectComponentToMatchSnapshot(language, message);
    });

    it(`should render correctly when given the Service request with a partial completion status and the current language is ${language}`, (): void => {
      const { message } = getBannerNotification(fakeServicePartialCompletion.orderRequests[0]);

      expectComponentToMatchSnapshot(language, message);
    });
  });
});
