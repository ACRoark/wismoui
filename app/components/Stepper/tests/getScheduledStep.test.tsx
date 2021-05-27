import React from 'react';
import { Provider } from 'react-redux';

import { SUPPORTED_LOCALES } from 'locales';

import createFakeOrder from 'components/createFakeOrder';
import useFlags from 'hooks/useFlags';
import { ModalProvider } from 'providers/ModalProvider';
import { userIsAuthenticated } from 'security/utils';
import encryptionApiClient from 'services/encryptionApiClient';
import { httpClient } from 'services/httpClient';
import { createMockStore, createSnapshotWithIntl } from 'testing/utils';
import { IOrderRequest, IOrderRequestStatusUpdate, IServiceOrderEvent, IVerificationEvent } from 'types';

import getScheduledStep from '../getScheduledStep';
import Step from '../Step';

jest.mock('hooks/useFlags');
jest.mock('security/utils');
jest.mock('services/encryptionApiClient');
jest.mock('services/httpClient');

const fakeOrder = createFakeOrder('MI22334455');
const fakeOrderCreatedDate = fakeOrder.createdAt;
const fakeServiceRequest = fakeOrder.orderRequests[0];
const mockAuth = userIsAuthenticated as jest.MockedFunction<typeof userIsAuthenticated>;
const mockEncryption = encryptionApiClient.encryptTokenAsync as jest.MockedFunction<typeof encryptionApiClient.encryptTokenAsync>;
const mockFlags = useFlags as jest.MockedFunction<typeof useFlags>;
const mockHttpClient = httpClient as jest.Mocked<typeof httpClient>;
const store = createMockStore();

const assertScheduledStepMatchesSnapshot = (
  serviceRequest: IOrderRequest,
  language: string,
  us1946Flag: boolean)
  : void => {
  mockAuth.mockReturnValue(true);
  mockEncryption.mockReturnValue(new Promise((): string => ''));
  mockFlags.mockReturnValue({
    canChangeLanguage: true,
    developerMode: true,
    us1946: us1946Flag,
    us1599: true,
    us3273: true,
  });
  mockHttpClient.post.mockReturnValue(new Promise((): string => ''));

  const options = {
    bug3883: true,
    us1599: true,
    us1946: us1946Flag,
    us3273: true
  };

  const stepDesc = getScheduledStep(fakeOrderCreatedDate, serviceRequest, options);

  const tree = createSnapshotWithIntl(
    <Provider store={store}>
      <ModalProvider>
        <Step {...stepDesc} />
      </ModalProvider>
    </Provider>, language);

  expect(tree).toMatchSnapshot();
};

const electricAppointmentWindow: IServiceOrderEvent = {
  appointment: {
    date: '2020-04-22',
    slotType: 'AM',
  },
  latestStatus: {
    createdAtDate: '20200321',
    createdAtTime: '223443',
    serviceOrderEventStatus: 'ON_SCHEDULE',
  },
  product: 'EFR_D1',
  serviceOrderCategory: null,
  serviceOrderId: 'abc123',
};

const gasAppointmentWindow: IServiceOrderEvent = {
  appointment: {
    date: '2020-04-22',
    slotType: 'PM',
  },
  product: 'GCC_GS_1H',
  serviceOrderCategory: null,
  serviceOrderId: 'abc123',
  latestStatus: {
    createdAtDate: '20200321',
    createdAtTime: '223443',
    serviceOrderEventStatus: 'ON_SCHEDULE',
  },
};

const gasAppointmentWindowCanceled: IServiceOrderEvent = {
  appointment: {
    date: '2020-04-22',
    slotType: 'AM',
  },
  latestStatus: {
    createdAtDate: '20200321',
    createdAtTime: '223443',
    serviceOrderEventStatus: 'CANCELED_CGI',
  },
  product: 'GCC_GS_1H',
  serviceOrderCategory: null,
  serviceOrderId: 'abc123',
};

const gasAppointmentWindowRescheduled: IServiceOrderEvent = {
  appointment: {
    date: '2020-04-22',
    slotType: 'PM',
  },
  product: 'GCC_GS_1H',
  serviceOrderCategory: null,
  serviceOrderId: 'abc123',
  latestStatus: {
    createdAtDate: '20200321',
    createdAtTime: '223443',
    serviceOrderEventStatus: 'RESCHEDULED',
  },
};

const anyTimeAppointmentWindow: IServiceOrderEvent = {
  appointment: {
    date: '2020-04-22',
    slotType: 'AN',
  },
  product: 'EFR_D1',
  serviceOrderCategory: null,
  serviceOrderId: 'abc123',
  latestStatus: {
    createdAtDate: '20200321',
    createdAtTime: '223443',
    serviceOrderEventStatus: 'ON_SCHEDULE',
  },
};

const delayedAppointment: IServiceOrderEvent = {
  appointment: {
    date: '20200727',
    slotType: null,
  },
  product: 'EFR_D1',
  serviceOrderCategory: null,
  serviceOrderId: 'abc123',
  latestStatus: {
    createdAtDate: '20200727',
    createdAtTime: '144118',
    serviceOrderEventStatus: 'DELAYED',
  },
};

const scheduledTodayAppointment: IServiceOrderEvent = {
  appointment: {
    date: '20200816',
    slotType: 'AN',
  },
  product: 'EFR_D1',
  serviceOrderCategory: null,
  serviceOrderId: 'abc123',
  latestStatus: {
    createdAtDate: '20200818',
    createdAtTime: '002514',
    serviceOrderEventStatus: 'SCHEDULED_TODAY',
  },
};

const orderRequestStatusUpdatesRequested: IOrderRequestStatusUpdate[] = [
  {
    createdAtDate: '20200519',
    createdAtTime: '131530',
    orderRequestStatus: 'REQUESTED',
  },
];

const orderRequestStatusUpdatesProcessed: IOrderRequestStatusUpdate[] = [
  {
    createdAtDate: '20200519',
    createdAtTime: '131530',
    orderRequestStatus: 'REQUESTED',
  },
  {
    createdAtDate: '20200520',
    createdAtTime: '092215',
    orderRequestStatus: 'PROCESSED',
  },
];

const orderRequestStatusUpdatesNeedsVerification: IOrderRequestStatusUpdate[] = [
  {
    createdAtDate: '20200519',
    createdAtTime: '131530',
    orderRequestStatus: 'REQUESTED',
  },
  {
    createdAtDate: '20200520',
    createdAtTime: '092215',
    orderRequestStatus: 'NEEDS_VERIFICATION',
  },
];

const orderRequestStatusUpdatesScheduled: IOrderRequestStatusUpdate[] = [
  {
    createdAtDate: '20200519',
    createdAtTime: '131530',
    orderRequestStatus: 'REQUESTED',
  },
  {
    createdAtDate: '20200520',
    createdAtTime: '092215',
    orderRequestStatus: 'PROCESSED',
  },
  {
    createdAtDate: '20200521',
    createdAtTime: '092215',
    orderRequestStatus: 'SCHEDULED',
  },
];

const verificationEventsEmpty: IVerificationEvent[] = [];

const verificationEventsWithAPCode: IVerificationEvent[] = [{
  verificationCategory: 'R975',
  verificationEventId: '123123',
  verificationEventStatusUpdates: [
    {
      verificationCode: 'AP',
      verificationEventStatus: 'ACTIVE',
      createdAtDate: '20200320',
      createdAtTime: '092215',
    },
  ],
}];

const verificationEventsWithMultipleBpems: IVerificationEvent[] = [
  {
    verificationCategory: 'R975',
    verificationEventId: '123123',
    verificationEventStatusUpdates: [
      {
        verificationCode: 'AP',
        verificationEventStatus: 'ACTIVE',
        createdAtDate: '20200320',
        createdAtTime: '092215',
      },
    ],
  },
  {
    verificationCategory: 'R984',
    verificationEventId: '123124',
    verificationEventStatusUpdates: [
      {
        verificationCode: 'PM',
        verificationEventStatus: 'ACTIVE',
        createdAtDate: '20200320',
        createdAtTime: '093015',
      },
    ],
  },
];

const verificationEventsWithCompletedAPCode: IVerificationEvent[] = [{
  verificationCategory: 'R975',
  verificationEventId: '123123',
  verificationEventStatusUpdates: [
    {
      verificationCode: 'AP',
      verificationEventStatus: 'COMPLETED',
      createdAtDate: '20200320',
      createdAtTime: '092215',
    },
  ],
}];

const requestRequestedWithEmptyVerificationEvents = {
  ...fakeServiceRequest,
  orderRequestStatusUpdates: orderRequestStatusUpdatesRequested,
  serviceOrderEvents: [],
  verificationEvents: verificationEventsEmpty,
};

const requestProcessedWithAnytimeAppointmentWindow = {
  ...fakeServiceRequest,
  orderRequestStatusUpdates: orderRequestStatusUpdatesProcessed,
  serviceOrderEvents: [anyTimeAppointmentWindow],
  verificationEvents: verificationEventsEmpty,
};

const requestProcessedWithElectricAppointmentWindow = {
  ...fakeServiceRequest,
  orderRequestStatusUpdates: orderRequestStatusUpdatesProcessed,
  serviceOrderEvents: [electricAppointmentWindow],
  verificationEvents: verificationEventsEmpty,
};

const requestProcessedWithElectricAndGasAppointmentWindows = {
  ...fakeServiceRequest,
  orderRequestStatusUpdates: orderRequestStatusUpdatesProcessed,
  serviceOrderEvents: [electricAppointmentWindow, gasAppointmentWindow],
  verificationEvents: verificationEventsEmpty,
};

const requestProcessedWithGasAndElectricAppointmentWindows = {
  ...fakeServiceRequest,
  orderRequestStatusUpdates: orderRequestStatusUpdatesProcessed,
  serviceOrderEvents: [gasAppointmentWindow, electricAppointmentWindow],
  verificationEvents: verificationEventsEmpty,
};

const requestProcessedWithGasCanceledAndRescheduled = {
  ...fakeServiceRequest,
  orderRequestStatusUpdates: orderRequestStatusUpdatesProcessed,
  serviceOrderEvents: [gasAppointmentWindowCanceled, gasAppointmentWindowRescheduled],
  verificationEvents: verificationEventsEmpty,
};

const requestNeedsVerificationWithAPVerificationCode = {
  ...fakeServiceRequest,
  orderRequestStatusUpdates: orderRequestStatusUpdatesNeedsVerification,
  serviceOrderEvents: [gasAppointmentWindow, electricAppointmentWindow],
  verificationEvents: verificationEventsWithAPCode,
};

const requestProcessedWithCompletedAPVerificationCode = {
  ...fakeServiceRequest,
  orderRequestStatusUpdates: orderRequestStatusUpdatesProcessed,
  serviceOrderEvents: [gasAppointmentWindow, electricAppointmentWindow],
  verificationEvents: verificationEventsWithCompletedAPCode,
};

const requestProcessedWithAPVerificationCode = {
  ...fakeServiceRequest,
  orderRequestStatusUpdates: orderRequestStatusUpdatesProcessed,
  serviceOrderEvents: [gasAppointmentWindow, electricAppointmentWindow],
  verificationEvents: verificationEventsWithAPCode,
};

const requestNeedsVerificationWithCompletedAPVerificationCode = {
  ...fakeServiceRequest,
  orderRequestStatusUpdates: orderRequestStatusUpdatesNeedsVerification,
  serviceOrderEvents: [gasAppointmentWindow, electricAppointmentWindow],
  verificationEvents: verificationEventsWithCompletedAPCode,
};

const requestProcessedWithNoVerificationOrServiceOrderEvents = {
  ...fakeServiceRequest,
  orderRequestStatusUpdates: orderRequestStatusUpdatesProcessed,
  serviceOrderEvents: [],
  verificationEvents: [],
};

const requestScheduledWithDelayedAndScheduledTodayServiceOrderEvents = {
  ...fakeServiceRequest,
  orderRequestStatusUpdates: orderRequestStatusUpdatesScheduled,
  serviceOrderEvents: [delayedAppointment, scheduledTodayAppointment],
  verificationEvents: verificationEventsEmpty,
};

const requestProcessedWithMultipleActiveBpems = {
  ...fakeServiceRequest,
  orderRequestStatusUpdates: orderRequestStatusUpdatesProcessed,
  verificationEvents: verificationEventsWithMultipleBpems,
};

const requestProcessedWithSingleActiveBpem = {
  ...fakeServiceRequest,
  orderRequestStatusUpdates: orderRequestStatusUpdatesProcessed,
  verificationEvents: verificationEventsWithAPCode,
};

const requestNeedsVerificationWithSingleActiveBpem = {
  ...fakeServiceRequest,
  orderRequestStatusUpdates: orderRequestStatusUpdatesNeedsVerification,
  verificationEvents: verificationEventsWithAPCode,
};

describe('getScheduledStep', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    it(`should return an empty description and a pending status when serviceOrderEvents is empty (${language})`, (): void =>
      assertScheduledStepMatchesSnapshot(requestRequestedWithEmptyVerificationEvents, language, false));

    // tslint:disable-next-line: max-line-length
    it(`should return the scheduled date, a completed status and an anytime appointment time when there is an anytime appointment window (${language})`, (): void =>
      assertScheduledStepMatchesSnapshot(requestProcessedWithAnytimeAppointmentWindow, language, false));

    it(`should return the scheduled date, a completed status and an appointment time when given an appointment window (${language})`, (): void =>
      assertScheduledStepMatchesSnapshot(requestProcessedWithElectricAppointmentWindow, language, false));

    it(`should return the latest scheduled date when appointment date is rescheduled (${language})`, (): void =>
      assertScheduledStepMatchesSnapshot(requestProcessedWithGasCanceledAndRescheduled, language, false));

    it(`should return the scheduled date, a completed status and multiple appointment times for each product appointment (${language})`, (): void =>
      assertScheduledStepMatchesSnapshot(requestProcessedWithElectricAndGasAppointmentWindows, language, false));

    // tslint:disable-next-line:max-line-length
    it(`should return the scheduled date, a completed status and multiple appointment times for each product appointment in order by start time (${language})`, (): void =>
      assertScheduledStepMatchesSnapshot(requestProcessedWithGasAndElectricAppointmentWindows, language, false));

    // tslint:disable-next-line:max-line-length
    it(`should return the scheduled step with an error status when the latest verificationCode is 'AP' and the latest orderRequestStatusUpdate is 'NEEDS_VERIFICATION' (${language})`, (): void =>
      assertScheduledStepMatchesSnapshot(requestNeedsVerificationWithAPVerificationCode, language, false));

    // tslint:disable-next-line:max-line-length
    it(`should return the scheduled step with a completed status when latest verificationCode is 'AP', status is 'COMPLETED', and the latest orderRequestStatusUpdate is 'PROCESSED' (${language})`, (): void =>
      assertScheduledStepMatchesSnapshot(requestProcessedWithCompletedAPVerificationCode, language, false));

    // tslint:disable-next-line:max-line-length
    it(`should return the scheduled step with an error status when latest verificationCode is 'AP', status is 'ACTIVE', and the latest orderRequestStatusUpdate is 'PROCESSED' (${language})`, (): void =>
      assertScheduledStepMatchesSnapshot(requestProcessedWithAPVerificationCode, language, false));

    // tslint:disable-next-line:max-line-length
    it(`should return the scheduled step with an error status when latest verificationCode is 'AP', status is 'COMPLETED', and the latest orderRequestStatusUpdate is 'NEEDS_VERIFICATION' (${language})`, (): void =>
      assertScheduledStepMatchesSnapshot(requestNeedsVerificationWithCompletedAPVerificationCode, language, false));

    // tslint:disable-next-line:max-line-length
    it(`should return the scheduled step with a completed status when there are no verificationEvents or serviceOrderEvents, but the orderRequestStatusUpdate is 'PROCESSED' and there are products in the products array (${language})`, (): void =>
      assertScheduledStepMatchesSnapshot(requestProcessedWithNoVerificationOrServiceOrderEvents, language, false));

    // tslint:disable-next-line:max-line-length
    it(`should return the latest scheduled date and a completed status when the service order was delayed but rescheduled for a later date (${language})`, (): void => {
      assertScheduledStepMatchesSnapshot(requestScheduledWithDelayedAndScheduledTodayServiceOrderEvents, language, false);
    });

    // tslint:disable-next-line:max-line-length
    it(`should return the scheduled step with an error status when the filtered verification events contains multiple ACTIVE bpems that match the verification codes ['AP', 'PM', 'WP'] and the us1946 flag is true (${language})`, (): void => {
      assertScheduledStepMatchesSnapshot(requestProcessedWithMultipleActiveBpems, language, true);
    });

    // tslint:disable-next-line:max-line-length
    it(`should return the scheduled step with an error status when the filtered verification events has an ACTIVE bpem that is in ['AP', 'PM', 'WP'], the latest request status is NEEDS_VERIFICATION and the us1946 flag is true (${language})`, (): void => {
      assertScheduledStepMatchesSnapshot(requestNeedsVerificationWithSingleActiveBpem, language, true);
    });

    // tslint:disable-next-line:max-line-length
    it(`should return the scheduled step with an error status when the filtered verification events has an ACTIVE bpem that is in ['AP', 'PM', 'WP'], the latest request Status is PROCESSED and the us1946 flag is true (${language})`, (): void => {
      assertScheduledStepMatchesSnapshot(requestProcessedWithSingleActiveBpem, language, true);
    });
  });
});
