import React from 'react';

import { SUPPORTED_LOCALES } from 'locales';
// TODO: Make this the default type and flip things around
import generate from 'testing/generators/generate';
import { createSnapshotWithIntl, renderWithIntl } from 'testing/utils';
import { IOrderRequestStatusUpdate, OrderRequestStatus, OrderRequestType, OrderRequestTypes } from 'types';

import OrderListItemTitle from '../OrderListItemTitle';

const expectComponentToMatchSnapshot = (
  language: string,
  orderRequestStatus: OrderRequestStatus,
  orderRequestType: OrderRequestType,
): void => {
  const currentOrderRequestStatus: IOrderRequestStatusUpdate = {
    ...generate.orderRequestStatusUpdate(),
    orderRequestStatus,
  };

  const tree = createSnapshotWithIntl(
    <OrderListItemTitle
      currentOrderRequestStatus={currentOrderRequestStatus}
      orderRequestType={orderRequestType}
    />, language);

  expect(tree).toMatchSnapshot();
};

const expectNoConsoleErrors = (
  language: string,
  orderRequestStatus: OrderRequestStatus,
  orderRequestType: OrderRequestType,
): void => {
  const currentOrderRequestStatus: IOrderRequestStatusUpdate = {
    ...generate.orderRequestStatusUpdate(),
    orderRequestStatus,
  };
  const spy = jest.spyOn(global.console, 'error');

  renderWithIntl(
    <OrderListItemTitle
      currentOrderRequestStatus={currentOrderRequestStatus}
      orderRequestType={orderRequestType}
    />, language);

  expect(spy).not.toHaveBeenCalled();
};

describe('<OrderListItemTitle />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    OrderRequestTypes.forEach((requestType: OrderRequestType): void => {
      it(`should not log errors in console when a ${requestType} request with a BPEM is passed (${language})`, (): void =>
        expectNoConsoleErrors(language, 'NEEDS_VERIFICATION', requestType));

      it(`should not log errors in console when a ${requestType} request without a BPEM is passed (${language})`, (): void =>
        expectNoConsoleErrors(language, 'SCHEDULED', requestType));

      it(`should not log errors in console when a ${requestType} request with a BPEM is passed (${language})`, (): void =>
        expectNoConsoleErrors(language, 'NEEDS_VERIFICATION', requestType));

      it(`should not log errors in console when a ${requestType} request without a BPEM is passed (${language})`, (): void =>
        expectNoConsoleErrors(language, 'SCHEDULED', requestType));

      it(`should render correctly when a ${requestType} request with a BPEM is passed (${language})`, (): void =>
        expectComponentToMatchSnapshot(language, 'NEEDS_VERIFICATION', requestType));

      it(`should render correctly when a ${requestType} request without a BPEM is passed (${language})`, (): void =>
        expectComponentToMatchSnapshot(language, 'SCHEDULED', requestType));

      it(`should render correctly when a ${requestType} request with a BPEM is passed (${language})`, (): void =>
        expectComponentToMatchSnapshot(language, 'NEEDS_VERIFICATION', requestType));

      it(`should render correctly when a ${requestType} request without a BPEM is passed (${language})`, (): void =>
        expectComponentToMatchSnapshot(language, 'SCHEDULED', requestType));
    });
  });
});
