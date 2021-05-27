import React from 'react';

import { SUPPORTED_LOCALES } from 'locales';

import { createSnapshotWithIntl, renderWithIntl } from 'testing/utils';
import OrderRequestType from 'types/OrderRequestType';

import ServiceRequestTitle from '../ServiceRequestTitle';

const orderRequests: OrderRequestType[] = ['MIMO_START', 'MIMO_STOP'];

describe('ServiceRequestTitle', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    orderRequests.forEach((orderRequest: string): void => {
      it(`should not log errors in console when rendering a ${orderRequest} order in ${language}`, (): void => {
        const spy = jest.spyOn(global.console, 'error');

        renderWithIntl(<ServiceRequestTitle orderRequestType={orderRequest as OrderRequestType} />, language);

        expect(spy).not.toHaveBeenCalled();
      });

      it(`should render the correct start title when the language is ${language} and orderRequestType is ${orderRequest}`, (): void => {
        const tree = createSnapshotWithIntl(<ServiceRequestTitle orderRequestType={orderRequest as OrderRequestType} />, language);

        expect(tree).toMatchSnapshot();
      });
    });
  });
});
