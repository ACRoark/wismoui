import React from 'react';

import { SUPPORTED_LOCALES } from 'locales';

import fakeServiceRequest from 'components/ServiceSummary/tests/fakeServiceRequest';
import { createSnapshotWithIntl, renderWithIntl } from 'testing/utils';
import IOrderRequest from 'types/IOrderRequest';

import CompletedStep from '../index';

const serviceRequestWithAwaitBilling: IOrderRequest = {
  ...fakeServiceRequest,
  orderRequestStatusUpdates: [
    {
      createdAtDate: '20200319',
      createdAtTime: '131530',
      orderRequestStatus: 'AWAITING_BILLING',
    },
  ],
  products: [
    {
      docId: '100003441473',
      isCanceled: true,
      processedAtDate: '20201221',
      productType: 'EFR_D1_1',
      serviceDate: '20201227',
    },
    {
      docId: '100003441473',
      isCanceled: false,
      processedAtDate: '20201221',
      productType: 'EFR_D1_1',
      serviceDate: '20201222',
    },
    {
      docId: '100003441473',
      isCanceled: false,
      processedAtDate: '20201221',
      productType: 'EFR_D1_1',
      serviceDate: '20201229',
    },
  ],
  serviceOrderEvents: [
    {
      appointment: {
        date: '2020-04-19',
        slotType: 'AN',
      },
      latestStatus: {
        createdAtDate: '20200418',
        createdAtTime: '131530',
        serviceOrderEventStatus: 'COMPLETED',
      },
      product: 'GCC_GS_1H',
      serviceOrderCategory: null,
      serviceOrderId: 'abc123',
    },
  ],
};

const serviceRequestWithAwaitingBillingAndLine2InAddress: IOrderRequest = {
  ...serviceRequestWithAwaitBilling,
  address: {
    city: 'Anytown',
    line1: '222 Second Rd',
    line2: 'Unit #6',
    state: 'MI',
    zip: '45678-1234',
  },
};
const awaitBillingCompleteDate = '20200418';
const line2CompleteDate = '20200418';

describe('CompletedStep', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    it(`should not log errors in console when rendered in ${language}`, (): void => {
      const spy = jest.spyOn(global.console, 'error');

      renderWithIntl(
        <CompletedStep
          address={serviceRequestWithAwaitBilling.address}
          completeDate={awaitBillingCompleteDate}
          requestType={serviceRequestWithAwaitBilling.orderRequestType}
        />,
        language,
      );
      expect(spy).not.toHaveBeenCalled();
    });

    // tslint:disable-next-line: max-line-length
    it(`should display a green checkbox and message text including a 1-line address when service request status is AWAITING_BILLING and language is ${language}`, (): void => {
      const tree = createSnapshotWithIntl(
        <CompletedStep
          address={serviceRequestWithAwaitBilling.address}
          completeDate={awaitBillingCompleteDate}
          requestType={serviceRequestWithAwaitBilling.orderRequestType}
        />,
        language,
      );

      expect(tree).toMatchSnapshot();
    });

    it(`should display a green checkbox and message text including a 2-line address when service request status is AWAITING_BILLING, address.line2 is NOT NULL and language is ${language}`, (): void => {
      const tree = createSnapshotWithIntl(
        <CompletedStep
          address={serviceRequestWithAwaitingBillingAndLine2InAddress.address}
          completeDate={line2CompleteDate}
          requestType={serviceRequestWithAwaitingBillingAndLine2InAddress.orderRequestType}
        />,
        language,
      );

      expect(tree).toMatchSnapshot();
    });

    it(`should display the service date from the products array when it renders and language is ${language}`, (): void => {
      const tree = createSnapshotWithIntl(
        <CompletedStep
          address={serviceRequestWithAwaitBilling.address}
          completeDate={serviceRequestWithAwaitBilling.products[2].serviceDate}
          requestType={serviceRequestWithAwaitBilling.orderRequestType}
        />,
        language,
      );

      expect(tree).toMatchSnapshot();
    });
  });
});
