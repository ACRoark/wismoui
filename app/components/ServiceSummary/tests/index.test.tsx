import React from 'react';
import { Provider } from 'react-redux';

import { SUPPORTED_LOCALES } from 'locales';

import ServiceSummary from 'components/ServiceSummary';
import { createMockStore, createSnapshotWithIntl, renderWithIntl } from 'testing/utils';
import IOrderRequest from 'types/IOrderRequest';

import fakeServiceRequest from './fakeServiceRequest';

const serviceRequestNoProducts = {
  ...fakeServiceRequest,
  products: [],
};

const store = createMockStore();

const expectNoConsoleErrors = (language: string, order: IOrderRequest): void => {
  const spy = jest.spyOn(global.console, 'error');

  renderWithIntl(<Provider store={store}><ServiceSummary serviceRequest={order} /></Provider>, language);

  expect(spy).not.toHaveBeenCalled();
};

const testServiceSummarySnapshot = (language: string, order: IOrderRequest): void => {
  const tree = createSnapshotWithIntl(<Provider store={store}><ServiceSummary
    serviceRequest={order} /></Provider>, language);

  expect(tree).toMatchSnapshot();
};

describe('<ServiceSummary />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    it(`should not log errors in console when rendered with a valid order in ${language}`, (): void =>
      expectNoConsoleErrors(language, fakeServiceRequest));

    it(`should not log errors in console when rendered with an order that has no products in ${language}`, (): void =>
      expectNoConsoleErrors(language, fakeServiceRequest));

    it(`should render correctly when given a valid order, and current language is ${language}`, (): void =>
      testServiceSummarySnapshot(language, fakeServiceRequest));

    it(`should render correctly when given an order with no products, and current language is ${language}`, (): void =>
      testServiceSummarySnapshot(language, serviceRequestNoProducts));
  });
});
