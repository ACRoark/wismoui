import React from 'react';

import { SUPPORTED_LOCALES } from 'locales';

import { testConfig } from 'components/constants';
import ServiceRequestView from 'components/ServiceRequestView';
import fakeServiceRequest from 'components/ServiceSummary/tests/fakeServiceRequest';
import useAuth from 'hooks/useAuth';
import useConfig from 'hooks/useConfig';
import useFlags from 'hooks/useFlags';
import useModal from 'hooks/useModal';
import generate from 'testing/generators';
import { createSnapshotWithIntl, renderWithIntl } from 'testing/utils';
import { IClosedDetails, IOrderRequest } from 'types';

jest.mock('hooks/useAuth');
jest.mock('hooks/useConfig');
jest.mock('hooks/useFlags');
jest.mock('hooks/useModal');
jest.mock('security/utils');

const mockAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockConfig = useConfig as jest.MockedFunction<typeof useConfig>;
const mockFlags = useFlags as jest.MockedFunction<typeof useFlags>;
const mockModal = useModal as jest.MockedFunction<typeof useModal>;

const orderCreatedDate = '20200301';

const serviceRequestWithAwaitBilling: IOrderRequest = {
  ...fakeServiceRequest,
  orderRequestStatusUpdates: [
    {
      createdAtDate: '20200319',
      createdAtTime: '131530',
      orderRequestStatus: 'AWAITING_BILLING',
    },
  ],
  serviceOrderEvents: [
    {
      appointment: {
        date: '2020-04-19',
        slotType: 'AM',
      },
      latestStatus: {
        createdAtDate: '20200418',
        createdAtTime: '223443',
        serviceOrderEventStatus: 'COMPLETED',
      },
      product: 'EFR_D1',
      serviceOrderCategory: null,
      serviceOrderId: 'abc123',
    },
  ],
};
const serviceRequestWithCompleted: IOrderRequest = {
  ...serviceRequestWithAwaitBilling,
  orderRequestStatusUpdates: [
    {
      createdAtDate: '20200319',
      createdAtTime: '131530',
      orderRequestStatus: 'COMPLETED',
    },
  ],
};
const serviceRequestWithoutStatusUpdates: IOrderRequest = {
  ...fakeServiceRequest,
  orderRequestStatusUpdates: [],
  serviceOrderEvents: [],
  verificationEvents: [],
};

const expectComponentToMatchSnapshot = (
  phoneNumber: string,
  order: IOrderRequest,
  language: string,
  userIsAuthenticated: boolean,
  isCancelled: boolean): void => {
  mockAuth.mockReturnValue({
    isAuthenticated: userIsAuthenticated,
    loading: false,
  });
  mockConfig.mockReturnValue({ ...testConfig });
  mockFlags.mockReturnValue({
    canChangeLanguage: false,
    developerMode: false,
    us3272: true,
  });
  mockModal.mockReturnValue({
    hideModal: jest.fn(),
    showModal: jest.fn(),
  });

  const closedDetails: IClosedDetails | null = isCancelled ? { closedAt: '2020-07-01', reason: 'CANCELED' } : null;

  const tree = createSnapshotWithIntl(
    <ServiceRequestView
      closedDetails={closedDetails}
      orderCreatedDate={orderCreatedDate}
      phoneNumber={phoneNumber}
      serviceRequest={order} />,
    language,
  );

  expect(tree).toMatchSnapshot();
};

describe('ServiceRequestView', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    it(`should not log errors in console when rendered in ${language}`, (): void => {
      mockAuth.mockReturnValue({
        isAuthenticated: true,
        loading: false,
      });
      mockConfig.mockReturnValue({ ...testConfig });
      mockFlags.mockReturnValue({
        canChangeLanguage: false,
        developerMode: false,
      });
      mockModal.mockReturnValue({
        hideModal: jest.fn(),
        showModal: jest.fn(),
      });

      const spy = jest.spyOn(global.console, 'error');

      renderWithIntl(
        <ServiceRequestView
          closedDetails={generate.closedDetails()}
          orderCreatedDate={orderCreatedDate}
          phoneNumber="5551111212"
          serviceRequest={serviceRequestWithAwaitBilling} />,
        language,
      );

      expect(spy).not.toHaveBeenCalled();
    });

    it(`should display the stepper when the status is empty and the user is authenticated ${language}`, (): void =>
      expectComponentToMatchSnapshot('5551111213', serviceRequestWithoutStatusUpdates, language, true, false));

    it(`should display the stepper when the status is empty and the user is unauthenticated ${language}`, (): void =>
      expectComponentToMatchSnapshot('5551111213', serviceRequestWithoutStatusUpdates, language, false, false));

    it(`should display the stepper when the status is not AWAITING_BILLING and the user is authenticated ${language}`, (): void =>
      expectComponentToMatchSnapshot('7345551122', fakeServiceRequest, language, true, false));

    it(`should display the stepper when the status is not AWAITING_BILLING and the user is not authenticated ${language}`, (): void =>
      expectComponentToMatchSnapshot('7345551122', fakeServiceRequest, language, false, false));

    it(`should display the cancelled view when the order was cancelled and the user is authenticated ${language}`, (): void =>
      expectComponentToMatchSnapshot('5551111213', fakeServiceRequest, language, true, true));

    it(`should display the cancelled view when the order was cancelled and the user is not authenticated ${language}`, (): void =>
      expectComponentToMatchSnapshot('5551111213', fakeServiceRequest, language, false, true));

    it(`should display the confirmation view when the status is AWAITING_BILLING and the user is authenticated ${language}`, (): void =>
      expectComponentToMatchSnapshot('5551111213', serviceRequestWithAwaitBilling, language, true, false));

    it(`should display the confirmation view when the status is AWAITING_BILLING and the user is not authenticated ${language}`, (): void =>
      expectComponentToMatchSnapshot('5551111213', serviceRequestWithAwaitBilling, language, false, false));

    it(`should display the confirmation view when the status is COMPLETED and the user is authenticated ${language}`, (): void =>
      expectComponentToMatchSnapshot('5551111213', serviceRequestWithCompleted, language, true, false));

    it(`should display the confirmation view when the status is COMPLETED and the user is not authenticated ${language}`, (): void =>
      expectComponentToMatchSnapshot('5551111213', serviceRequestWithCompleted, language, false, false));
  });
});
