/**
 *
 * Tests for TransferServiceView
 *
 */
import React from 'react';

import { SUPPORTED_LOCALES } from 'locales';

import createFakeOrder from 'components/createFakeOrder';
import { shallowWithIntl } from 'testing/utils';

import TransferServiceView from '..';

describe('<TransferServiceView />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  const order = createFakeOrder('MI12345678');

  languages.forEach((language: string): void => {
    it(`should not log errors in console when rendered in ${language}`, (): void => {
      const spy = jest.spyOn(global.console, 'error');

      shallowWithIntl(<TransferServiceView order={order} />, language);

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
