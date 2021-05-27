/**
 *
 * Tests for ProductName
 *
 */
import React from 'react';

import { translationMessages } from 'i18n';
import { SUPPORTED_LOCALES } from 'locales';

import { renderWithIntl } from 'testing/utils';
import { ProductTypes } from 'types';

import ProductName from '..';

describe('<ProductName />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    ProductTypes.forEach((productType: string): void => {
      it(`should not log errors in console when rendered with product type ${productType} in ${language}`, (): void => {
        const spy = jest.spyOn(global.console, 'error');

        renderWithIntl(<ProductName productType={productType} />, language);

        expect(spy).not.toHaveBeenCalled();
      });

      it(`Should return the expected value when rendered with product type ${productType} in ${language}`, (): void => {
        const wrapper = renderWithIntl(<ProductName productType={productType} />, language);

        const expected = translationMessages[language][`wismo.components.product-name.${productType}`];

        expect(wrapper.text()).toEqual(expected);
      });
    });

    it(`Should handle when the product type is unknown (${language})`, (): void => {
      const wrapper = renderWithIntl(<ProductName productType="ABC_123" />, language);

      expect(wrapper.text()).toEqual('');
    });
  });
});
