/**
 *
 * Tests for OrderStatusView
 *
 */
import React from 'react';

import { SUPPORTED_LOCALES } from 'locales';

import { testConfig } from 'components/constants';
import createFakeOrder from 'components/createFakeOrder';
import ServiceRequestView from 'components/ServiceRequestView';
import TransferServiceView from 'components/TransferServiceView';
import useConfig from 'hooks/useConfig';
import useFlags from 'hooks/useFlags';
import useModal from 'hooks/useModal';
import { userIsAuthenticated } from 'security/utils';
import { mountWithIntl, renderWithIntl } from 'testing/utils';

import OrderStatusView from '..';

jest.mock('hooks/useConfig');
jest.mock('hooks/useFlags');
jest.mock('hooks/useModal');
jest.mock('security/utils');

const mockAuth = userIsAuthenticated as jest.MockedFunction<typeof userIsAuthenticated>;
const mockConfig = useConfig as jest.MockedFunction<typeof useConfig>;
const mockFlags = useFlags as jest.MockedFunction<typeof useFlags>;
const mockModal = useModal as jest.MockedFunction<typeof useModal>;

const orderNumbers = ['MI12345678', 'MO12345678', 'MT12345678'];

describe('<OrderStatusView />', (): void => {
  beforeEach((): void => {
    mockAuth.mockReturnValue(true);
    mockConfig.mockReturnValue({ ...testConfig });
    mockFlags.mockReturnValue({
      canChangeLanguage: true,
      developerMode: true,
    });
    mockModal.mockReturnValue({
      hideModal: jest.fn(),
      showModal: jest.fn(),
    });
  });

  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    orderNumbers.forEach((orderNumber: string): void => {
      it(`should not log errors in console when rendered in ${language}`, (): void => {
        const order = createFakeOrder(orderNumber);

        const spy = jest.spyOn(global.console, 'error');

        renderWithIntl(<OrderStatusView order={order} />, language);

        expect(spy).not.toHaveBeenCalled();
      });
    });

    it(`should return a <ServiceRequestView /> when the order type is MIMO_START (${language})`, (): void => {
      const order = createFakeOrder('MI12345678');

      const wrapper = mountWithIntl(<OrderStatusView order={order} />, language);

      const match = wrapper.containsMatchingElement(
        <ServiceRequestView
          closedDetails={order.closedDetails}
          orderCreatedDate={order.createdAt}
          phoneNumber={order.orderRequests[0].contactPhoneNumber}
          serviceRequest={order.orderRequests[0]} />
      );

      expect(match).toBe(true);
    });

    it(`should return a <ServiceRequestView /> when the order type is MIMO_STOP (${language})`, (): void => {
      const order = createFakeOrder('MO12345678');

      const wrapper = mountWithIntl(<OrderStatusView order={order} />, language);

      const match = wrapper.containsMatchingElement(
        <ServiceRequestView
          closedDetails={order.closedDetails}
          orderCreatedDate={order.createdAt}
          phoneNumber={order.orderRequests[0].contactPhoneNumber}
          serviceRequest={order.orderRequests[0]} />
      );

      expect(match).toBe(true);
    });

    it(`should return a <TransferServiceView /> when the order type is MIMO_TRANSFER (${language})`, (): void => {
      const order = createFakeOrder('MT12345678');

      const wrapper = mountWithIntl(<OrderStatusView order={order} />, language);

      const match = wrapper.containsMatchingElement(<TransferServiceView order={order} />);

      expect(match).toBe(true);
    });
  });
});
