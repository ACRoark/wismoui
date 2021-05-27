import React from 'react';
import { Provider } from 'react-redux';

import createFakeOrder from 'components/createFakeOrder';
import useFlags from 'hooks/useFlags';
import { ModalProvider } from 'providers/ModalProvider';
import { createMockStore, createSnapshotWithIntl } from 'testing/utils';
import IOrderRequest from 'types/IOrderRequest';
import Step from '../Step';

import getRequestedStep from '../getRequestedStep';

import { SUPPORTED_LOCALES } from 'locales';

jest.mock('hooks/useFlags');

const fakeOrder = createFakeOrder('MI12345678');
const fakeServiceRequest = fakeOrder.orderRequests[0];
const newServiceRequest = {
  ...fakeServiceRequest,
  orderRequestStatusUpdates: [],
};
const mockFlags = useFlags as jest.MockedFunction<typeof useFlags>;
const store = createMockStore();

const assertRequestedStepMatchesSnapshot = (serviceRequest: IOrderRequest, language: string): void => {
  mockFlags.mockReturnValue({
    canChangeLanguage: true,
    developerMode: true,
  });

  const stepDesc = getRequestedStep('09-22-2020', serviceRequest);

  const tree = createSnapshotWithIntl(
    <Provider store={store}>
      <ModalProvider>
        <Step {...stepDesc} />
      </ModalProvider>
    </Provider>, language);

  expect(tree).toMatchSnapshot();
};

describe('getRequestedStep', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);
  languages.forEach((language: string): void => {
    it(`should return the date the order was created when language is ${language}`, (): void => {
      assertRequestedStepMatchesSnapshot(fakeServiceRequest, language);
    });

    it(`should return the date the order was created and a 'new order' message when language is ${language}`, (): void => {
      assertRequestedStepMatchesSnapshot(newServiceRequest, language);
    });

    it(`should return the date the order was created when language is ${language}, and orderRequestStatusUpdates array is not empty`, (): void => {
      assertRequestedStepMatchesSnapshot(fakeServiceRequest, language);
    });
  });
});
