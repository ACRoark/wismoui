import React from 'react';

import { SUPPORTED_LOCALES } from 'locales';
import { Provider } from 'react-redux';

import ProductsListField from 'components/ProductsListField';
import { createMockStore, createSnapshotWithIntl, renderWithIntl } from 'testing/utils';
import IProduct from 'types/IProduct';

const store = createMockStore();

const fakeProducts: IProduct[] = [
  {
    productType: 'ECC_D1_1',
    serviceDate: '04-22-2020',
  },
  {
    productType: 'GCR_A_H',
    serviceDate: '04-20-2020',
  },
];

describe('<ProductsListField />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    it(`should not log errors in console when rendered in ${language}`, (): void => {
      const spy = jest.spyOn(global.console, 'error');

      renderWithIntl(<Provider store={store}><ProductsListField products={fakeProducts} /></Provider>, language);

      expect(spy).not.toHaveBeenCalled();
    });

    it(`should render correctly when a valid product list is passed and the current language is ${language}`, (): void => {
      const tree = createSnapshotWithIntl(<Provider store={store}><ProductsListField products={fakeProducts}/></Provider>, language);

      expect(tree).toMatchSnapshot();
    });
  });
});
