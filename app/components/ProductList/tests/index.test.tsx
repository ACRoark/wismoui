import { SUPPORTED_LOCALES } from 'locales';
import React from 'react';
import { Provider } from 'react-redux';

import ProductList from 'components/ProductList';
import { createMockStore, createSnapshotWithIntl, renderWithIntl } from 'testing/utils';
import IProduct from 'types/IProduct';

const store = createMockStore();

const emptyList: IProduct[] =[];
const oneItemList: IProduct[] = [
  {
    productType: 'EFR_D1_1',
    serviceDate: '2020-03-21',
  },
];
const threeItemList: IProduct[] = [
  {
    productType: 'EFR_D1_1',
    serviceDate: '2020-03-21',
  },
  {
    productType: 'GCR_A_H',
    serviceDate: '2020-03-15',
  },
  {
    productType: 'EFR_D1',
    serviceDate: '04-22-2020',
  },
];

const expectNoConsoleErrors = (language: string, products: IProduct[]): void => {
  const spy = jest.spyOn(global.console, 'error');

  renderWithIntl(<Provider store={store}><ProductList products={products} /></Provider>, language);

  expect(spy).not.toHaveBeenCalled();
};

const testProductListSnapshot = (language: string, products: IProduct[] | null): void => {
  const tree = createSnapshotWithIntl(<Provider store={store}><ProductList products={products} /></Provider>, language);

  expect(tree).toMatchSnapshot();
};

describe('<ProductList />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    it(`should not log errors in console when rendered with a single item and the current language is ${language}`, (): void =>
      expectNoConsoleErrors(language, emptyList));

    it(`should not log errors in console when rendered with an empty list and the current language is ${language}`, (): void =>
      expectNoConsoleErrors(language, emptyList));

    it(`should not log errors in console when rendered with multiple items and the current language is ${language}`, (): void =>
      expectNoConsoleErrors(language, emptyList));

    it(`should render correctly when a single item is passed and the current language is ${language}`, (): void =>
      testProductListSnapshot(language, oneItemList));

    it(`should render correctly when an empty list is passed and the current language is ${language}`, (): void =>
      testProductListSnapshot(language, emptyList));

    it(`should render correctly when multiple items are passed and the current language is ${language}`, (): void =>
      testProductListSnapshot(language, threeItemList));

    it(`should render correctly when null is passed and the current language is ${language}`, (): void =>
      testProductListSnapshot(language, null));
  });
});
