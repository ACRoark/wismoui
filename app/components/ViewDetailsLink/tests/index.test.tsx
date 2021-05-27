import React from 'react';
import { Provider } from 'react-redux';

import { testConfig } from 'components/constants';
import createFakeOrder from 'components/createFakeOrder';
import useConfig from 'hooks/useConfig';
import useModal from 'hooks/useModal';
import { ModalProvider } from 'providers/ModalProvider';
import encryptionApiClient from 'services/encryptionApiClient';
import { createMockStore, createSnapshotWithIntl, renderWithIntl } from 'testing/utils';
import IModalConfig from 'types/IModalConfig';
import IServiceOrderEvent from 'types/IServiceOrderEvent';
import IVerificationEvent from 'types/IVerificationEvent';

import ViewDetailsLink from '../index';

import { SUPPORTED_LOCALES } from 'locales';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

jest.mock('hooks/useConfig');
jest.mock('hooks/useModal');
jest.mock('services/encryptionApiClient');

const fakeServiceRequest = createFakeOrder('MI11223344').orderRequests[0];
const requestedTestDate = '2020-05-28';
const verificationCode = 'AD';
const verificationCategory = 'R975';
const verificationEventsActiveBpem: IVerificationEvent[] = [{
    verificationCategory: 'R975',
    verificationEventId: '123123',
    verificationEventStatusUpdates: [
      {
        verificationCode: 'AD',
        verificationEventStatus: 'ACTIVE',
        createdAtDate: '20200520',
        createdAtTime: '092215',
      },
      ],
}];
const mockConfig = useConfig as jest.MockedFunction<typeof useConfig>;
const mockEncryption = encryptionApiClient.encryptTokenAsync as jest.MockedFunction<typeof encryptionApiClient.encryptTokenAsync>;
const mockModal = useModal as jest.MockedFunction<typeof useModal>;

const modalTitle = <FormattedMessage {...messages.customerVerification} />;
const store = createMockStore();

const modalContentForVerification = (
  <span className="view-details-modal-content">
        <FormattedMessage
          {...messages[`${verificationCode}_${verificationCategory}_description`]}
          values={{
            a: (chunks: React.ReactNode): React.ReactNode => (
              <a href={'http://www.senddocuments.com'}
                 target={'_blank'}>{chunks}</a>
            ),
            li: (msg: React.ReactNode): React.ReactNode => (
              <li>
                {msg}
              </li>
            ),
            p: (...msg: React.ReactNode[]): React.ReactNode => (
              <p>
                {msg}
              </p>
            ),
            ol: (...msg: React.ReactNode[]): React.ReactNode => (
              <ol>
                {msg}
              </ol>
            ),
            orderCreatedDate: requestedTestDate,
            ul: (...msg: React.ReactNode[]): React.ReactNode => (
              <ul>
                {msg}
              </ul>
            ),
          }}
        />
  </span>
);

const modalContentForServiceOrderEvents = (
  <span className="dte-wismo-view-details-modal-content">
      <FormattedMessage
        {...messages[`${status}_description`]}
        values={{
          phoneNumber: (
            <a className="phone-number" href="tel:+8004774747">
              800.477.4747
            </a>
          ),
          website: (
            <a href={'http://www.doo-dee-doo.com'}>
              <FormattedMessage {...messages.website} />
            </a>
          ),
        }}
      />
    </span>
);
const modalConfigForVerification: IModalConfig = {
  content: modalContentForVerification,
  title: modalTitle,
};

const modalConfigForServiceOrderEvents: IModalConfig = {
  content: modalContentForServiceOrderEvents,
  title: modalTitle,
};

const serviceOrderEventsCanceledStatus: IServiceOrderEvent[] = [
  {
    appointment: {
      date: '2020-05-22',
      slotType: 'AM',
    },
    latestStatus: {
      createdAtDate: '20200522',
      createdAtTime: '223443',
      serviceOrderEventStatus: 'CANCELED',
    },
    product: 'EFR_D1',
    serviceOrderCategory: null,
    serviceOrderId: 'abc123',
  },
];

const expectComponentToMatchSnapshotForVerification = (language: string): void => {
  mockConfig.mockReturnValue({ ...testConfig });
  mockEncryption.mockReturnValue(new Promise((): string => ''));
  mockModal.mockReturnValue({
    hideModal: jest.fn(),
    showModal: jest.fn(),
  });

  const serviceRequest = {
    ...fakeServiceRequest,
    verificationEvents: verificationEventsActiveBpem,
  };

  const tree = createSnapshotWithIntl(
    <Provider store={store}>
      <ModalProvider {...modalConfigForVerification}>
        <ViewDetailsLink orderCreatedDate={requestedTestDate}
                         serviceRequest={serviceRequest}
        />
      </ModalProvider>
    </Provider>, language);

  expect(tree).toMatchSnapshot();
};

const expectComponentToMatchSnapshotForServiceOrderEvents = (language: string): void => {
  mockConfig.mockReturnValue({ ...testConfig });
  mockEncryption.mockReturnValue(new Promise((): string => ''));
  mockModal.mockReturnValue({
    hideModal: jest.fn(),
    showModal: jest.fn(),
  });

  const serviceRequest = {
    ...fakeServiceRequest,
    serviceOrderEvents: serviceOrderEventsCanceledStatus,
  };

  const tree = createSnapshotWithIntl(
    <Provider store={store}>
      <ModalProvider {...modalConfigForServiceOrderEvents}>
        <ViewDetailsLink
          orderCreatedDate="2020-07-31"
          serviceRequest={serviceRequest}
        />
      </ModalProvider>
    </Provider>, language);

  expect(tree).toMatchSnapshot();
};

const shouldNotLogErrors = (language: string): void => {
  mockConfig.mockReturnValue({ ...testConfig });
  mockEncryption.mockReturnValue(new Promise((): string => ''));
  mockModal.mockReturnValue({
    hideModal: jest.fn(),
    showModal: jest.fn(),
  });

  const spy = jest.spyOn(global.console, 'error');
  const serviceRequest = {
    ...fakeServiceRequest,
    verificationEvents: verificationEventsActiveBpem,
  };

  renderWithIntl(
    <Provider store={store}>
      <ModalProvider {...modalConfigForVerification}>
        <ViewDetailsLink orderCreatedDate="2020-05-28"
                       serviceRequest={serviceRequest}
        />
      </ModalProvider>
    </Provider>, language);

  expect(spy).not.toHaveBeenCalled();
};

describe('<ViewDetailsLink />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    it(`should not log errors in console when the valid content and title values are provided (${language})`, (): void =>
      shouldNotLogErrors(language));

    it(`should render the link when a valid verificationCategory, verificationCode, and wantDate are provided (${language})`, (): void =>
      expectComponentToMatchSnapshotForVerification(language));

    it(`should render the link when a valid serviceOrderEvents and serviceOrderEventStatus are provided (${language})`, (): void =>
      expectComponentToMatchSnapshotForServiceOrderEvents(language));
  });
});
