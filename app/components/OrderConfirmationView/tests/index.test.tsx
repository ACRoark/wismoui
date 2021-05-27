/**
 *
 * Tests for OrderConfirmationView
 *
 */
import React from 'react';
import { Provider } from 'react-redux';

import OrderConfirmationView from 'components/OrderConfirmationView';
import fakeServiceRequest from 'components/ServiceSummary/tests/fakeServiceRequest';
import useModal from 'hooks/useModal';
import { ModalProvider } from 'providers/ModalProvider';
import generate from 'testing/generators';
import {createMockStore, renderWithIntl } from 'testing/utils';
import IOrderRequest from 'types/IOrderRequest';

import { SUPPORTED_LOCALES } from 'locales';
import { generateFutureDate } from 'testing/generators/generateDate';

jest.mock('hooks/useModal');

const mockModal = useModal as jest.MockedFunction<typeof useModal>;
const store = createMockStore();

const fakeOrder: IOrderRequest = {
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

const fakeOrderDelayed: IOrderRequest = {
  ...fakeServiceRequest,
  orderRequestStatusUpdates: [
    {
      createdAtDate: '20200419',
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
        serviceOrderEventStatus: 'DELAYED',
      },
      product: 'EFR_D1',
      serviceOrderCategory: null,
      serviceOrderId: 'abc123',
    },
  ],
};

describe('<OrderConfirmationView />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    const orderCreatedDate = generateFutureDate();
    it(`should not log errors in console when rendered in ${language} for an order that is completed`, (): void => {
      mockModal.mockReturnValue({
        hideModal: jest.fn(),
        showModal: jest.fn(),
      });

      const spy = jest.spyOn(global.console, 'error');

      renderWithIntl(
      <Provider store={store}>
        <ModalProvider>
          <OrderConfirmationView
           closedDetails={generate.closedDetails()}
           order={fakeOrder}
           orderCreatedDate={orderCreatedDate}
          />
        </ModalProvider>
      </Provider>, language);

      expect(spy).not.toHaveBeenCalled();
    });
    it(`should not log errors in console when rendered in ${language} for an order that is delayed`, (): void => {
      mockModal.mockReturnValue({
        hideModal: jest.fn(),
        showModal: jest.fn(),
      });

      const spy = jest.spyOn(global.console, 'error');

      renderWithIntl(
      <Provider store={store}>
        <ModalProvider>
          <OrderConfirmationView
          closedDetails={generate.closedDetails()}
          order={fakeOrderDelayed}
          orderCreatedDate={orderCreatedDate} />
        </ModalProvider>
      </Provider>, language);

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
