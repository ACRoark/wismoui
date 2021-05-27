import React from 'react';
import { Provider } from 'react-redux';

import Stepper from 'components/Stepper';
import useFlags from 'hooks/useFlags';
import { ModalProvider } from 'providers/ModalProvider';
import { userIsAuthenticated } from 'security/utils';
import { httpClient } from 'services/httpClient';
import { createMockStore, createSnapshotWithIntl, renderWithIntl } from 'testing/utils';
import { IOrderRequest, } from 'types';

jest.mock('hooks/useFlags');
jest.mock('security/utils');
jest.mock('services/httpClient');

const mockAuth = userIsAuthenticated as jest.MockedFunction<typeof userIsAuthenticated>;
const mockFlags = useFlags as jest.MockedFunction<typeof useFlags>;
const mockHttpClient = httpClient as jest.Mocked<typeof httpClient>;
const store = createMockStore();
const orderCreatedDate = '20200304';

const serviceRequest: IOrderRequest = {
  accountNumber: '001234567890',
  address: {
    city: 'Hobbiton',
    line1: '1 Bagshot Row',
    line2: null,
    state: 'TS',
    zip: '02890',
  },
  contactPhoneNumber: '7348675309',
  orderRequestType: 'MIMO_START',
  orderRequestStatusUpdates: [
    {
      createdAtDate: '20200319',
      createdAtTime: '131530',
      orderRequestStatus: 'REQUESTED',
    },
    {
      createdAtDate: '20200320',
      createdAtTime: '092215',
      orderRequestStatus: 'PROCESSED',
    },
    {
      createdAtDate: '20200321',
      createdAtTime: '223443',
      orderRequestStatus: 'SCHEDULED',
    },
  ],
  premiseId: 'premise123',
  products: [
    {
      productType: 'EFR_D1',
      serviceDate: '20200422',
    },
  ],
  serviceOrderEvents: [
    {
      appointment: {
        date: '20200422',
        slotType: 'AM',
      },
      latestStatus: {
        createdAtDate: '20200321',
        createdAtTime: '223443',
        serviceOrderEventStatus: 'SCHEDULED_TODAY',
      },
      product: 'EFR_D1',
      serviceOrderId: 'abc123',
      serviceOrderCategory: null,
    },
    {
      appointment: {
        date: '20200422',
        slotType: 'PM',
      },
      latestStatus: {
        createdAtDate: '20200321',
        createdAtTime: '223443',
        serviceOrderEventStatus: 'SCHEDULED_TODAY',
      },
      product: 'GCC_GS_1H',
      serviceOrderCategory: null,
      serviceOrderId: 'abc123',
    },
  ],
  verificationEvents: [
    {
      verificationCategory: 'R975',
      verificationEventId: '123123',
      verificationEventStatusUpdates: [
        {
          verificationCode: 'AD',
          verificationEventStatus: 'COMPLETED',
          createdAtDate: '20200320',
          createdAtTime: '092215',
        },
      ],
    },
  ],
  wantDate: '20200422',
};

const multipleBpemsServiceRequest: IOrderRequest = {
  accountNumber: '001234567890',
  address: {
    city: 'Hobbiton',
    line1: '1 Bagshot Row',
    line2: null,
    state: 'TS',
    zip: '02890',
  },
  contactPhoneNumber: '7348675309',
  orderRequestType: 'MIMO_START',
  orderRequestStatusUpdates: [
    {
      createdAtDate: '20200319',
      createdAtTime: '131530',
      orderRequestStatus: 'REQUESTED',
    },
    {
      createdAtDate: '20200320',
      createdAtTime: '092215',
      orderRequestStatus: 'NEEDS_VERIFICATION',
    },
  ],
  premiseId: 'premise123',
  products: [
    {
      productType: 'EFR_D1',
      serviceDate: '2020-04-22',
    },
  ],
  serviceOrderEvents: [
    {
      appointment: {
        date: '2020-04-22',
        slotType: 'AM',
      },
      latestStatus: {
        createdAtDate: '20200321',
        createdAtTime: '223443',
        serviceOrderEventStatus: 'SCHEDULED_TODAY',
      },
      product: 'EFR_D1',
      serviceOrderId: 'abc123',
      serviceOrderCategory: null,
    },
    {
      appointment: {
        date: '2020-04-22',
        slotType: 'PM',
      },
      latestStatus: {
        createdAtDate: '20200321',
        createdAtTime: '223443',
        serviceOrderEventStatus: 'SCHEDULED_TODAY',
      },
      product: 'GCC_GS_1H',
      serviceOrderCategory: null,
      serviceOrderId: 'abc123',
    },
  ],
  verificationEvents: [
    {
      verificationCategory: 'R975',
      verificationEventId: '123123',
      verificationEventStatusUpdates: [
        {
          verificationCode: 'AD',
          verificationEventStatus: 'ACTIVE',
          createdAtDate: '20200320',
          createdAtTime: '092215',
        },
      ],
    },
    {
      verificationCategory: 'R980',
      verificationEventId: '123124',
      verificationEventStatusUpdates: [
        {
          verificationCode: 'PR',
          verificationEventStatus: 'ACTIVE',
          createdAtDate: '20200320',
          createdAtTime: '092215',
        },
      ],
    },
  ],
  wantDate: '2020-04-22',
};

const languages = ['en', 'es'];

describe('Stepper', (): void => {
  beforeEach((): void => {
    mockAuth.mockReturnValue(true);
    mockFlags.mockReturnValue({
      canChangeLanguage: true,
      developerMode: true,
    });
    mockHttpClient.post.mockReturnValue(new Promise((): string => ''));
  });

  languages.forEach((language: string): void => {
    it(`should not log errors in console when rendered in ${language}`, (): void => {
      const spy = jest.spyOn(global.console, 'error');

      renderWithIntl(<Provider store={store}><Stepper orderCreatedDate={orderCreatedDate} serviceRequest={serviceRequest} /></Provider>, language);

      expect(spy).not.toHaveBeenCalled();
    });

    it(`should show correct steps and descriptions when language is ${language} and given a serivceRequest`, (): void => {
      const tree = createSnapshotWithIntl(
      <Provider store={store}>
        <Stepper orderCreatedDate={orderCreatedDate} serviceRequest={serviceRequest} />
      </Provider>, language
      );

      expect(tree).toMatchSnapshot();
    });

    it(`should show correct steps and description when language is ${language}, given a serviceRequest, and us1946 flag is true`, (): void => {
      mockAuth.mockReturnValue(true);
      mockFlags.mockReturnValue({
        bug3665: true,
        bug3883: true,
        canChangeLanguage: true,
        developerMode: true,
        us1946: true,
      });

      const tree = createSnapshotWithIntl(
        <Provider store={store}>
          <ModalProvider>
          <Stepper orderCreatedDate={orderCreatedDate} serviceRequest={multipleBpemsServiceRequest} />
          </ModalProvider>
        </Provider>, language);

      expect(tree).toMatchSnapshot();
    });
  });
});
