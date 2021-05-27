import React from 'react';
import { Provider } from 'react-redux';

import { SUPPORTED_LOCALES } from 'locales';
import { createMockStore, createSnapshotWithIntl } from 'testing/utils';
import IOrderRequest from 'types/IOrderRequest';

import useFlags from 'hooks/useFlags';
import StatusHistory from '..';

import { cancelledServiceRequest, retroStartServiceRequest, startServiceRequest, stopServiceRequest } from './data';

jest.mock('hooks/useFlags');

const mockFlags = useFlags as jest.MockedFunction<typeof useFlags>;
const store = createMockStore();

mockFlags.mockReturnValue({
  canChangeLanguage: true,
  developerMode: true,
});

const expectComponentToMatchSnapshot = (order: IOrderRequest, orderCreatedDate: string, language: string): void => {
  const tree = createSnapshotWithIntl(<Provider store={store}><StatusHistory order={order} orderCreatedDate={orderCreatedDate} /></Provider>, language);

  expect(tree).toMatchSnapshot();
};

describe('StatusHistory', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);
  const orderCreatedDate = '2020-07-13T20:57:41.7710501Z';

  languages.forEach((language: string): void => {
    it(`should show status history when language is ${language} and service request is cancelled`, (): void =>
      expectComponentToMatchSnapshot(cancelledServiceRequest, orderCreatedDate, language));

    it(`should show status history when language is ${language} and service request is Start (retroactive order)`, (): void =>
      expectComponentToMatchSnapshot(retroStartServiceRequest, '2020-04-21', language));

    it(`should show status history when language is ${language} and service request is Start`, (): void =>
      expectComponentToMatchSnapshot(startServiceRequest, orderCreatedDate, language));

    it(`should show status history when language is ${language} and service request is Stop`, (): void =>
      expectComponentToMatchSnapshot(stopServiceRequest, orderCreatedDate, language));
  });
});
