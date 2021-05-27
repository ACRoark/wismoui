import React from 'react';

import { SUPPORTED_LOCALES } from 'locales';
import { createSnapshotWithIntl, renderWithIntl } from 'testing/utils';
import { OrderRequestType, OrderRequestTypes } from 'types';

import OrderListItemIcon from '../OrderListItemIcon';

const expectNoConsoleErrors = (language: string, requestType: OrderRequestType): void => {
  const spy = jest.spyOn(global.console, 'error');

  renderWithIntl(<OrderListItemIcon requestType={requestType} />, language);

  expect(spy).not.toHaveBeenCalled();
};

const expectComponentToMatchSnapshot = (language: string, requestType: OrderRequestType): void => {
  const tree = createSnapshotWithIntl(<OrderListItemIcon requestType={requestType} />, language);

  expect(tree).toMatchSnapshot();
};

describe('<OrderListItemIcon />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    OrderRequestTypes.forEach((requestType: OrderRequestType): void => {
      it(`should not log errors in console when rendered for '${requestType}' requests and the current language is ${language}`, (): void =>
        expectNoConsoleErrors(language, requestType));

      it(`should render correctly when the request type is '${requestType}' and the current language is ${language}`, (): void =>
        expectComponentToMatchSnapshot(language, requestType));
    });
  });
});
