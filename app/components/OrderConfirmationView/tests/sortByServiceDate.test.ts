import { IProduct } from 'types';

import sortByServiceDate from '../sortByServiceDate';

describe('sortByServiceDate', (): void => {
  it('should return the same order of products when they have the same date', (): void => {
    const products: IProduct[] = [
      {
        docId: '100003441473',
        isCanceled: false,
        processedAtDate: '20201221',
        productType: 'EFR_D1_1',
        serviceDate: '2020-12-22',
      },
      {
        docId: '100003441473',
        isCanceled: false,
        processedAtDate: '20201221',
        productType: 'EFR_D1_1',
        serviceDate: '2020-12-22',
      }
    ];

    expect(sortByServiceDate(products)).toStrictEqual(products);
  });

  it('should descending order products by service date', (): void => {
    const products: IProduct[] = [
      {
        docId: '100003441473',
        isCanceled: true,
        processedAtDate: '20201221',
        productType: 'EFR_D1_1',
        serviceDate: '20201227',
      },
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
    ];

    const expected: IProduct[] = [
      {
        docId: '100003441473',
        isCanceled: false,
        processedAtDate: '20201221',
        productType: 'EFR_D1_1',
        serviceDate: '20201229',
      },
      {
        docId: '100003441473',
        isCanceled: true,
        processedAtDate: '20201221',
        productType: 'EFR_D1_1',
        serviceDate: '20201227',
      },
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
    ];

    expect(sortByServiceDate(products)).toStrictEqual(expected);
  });
});
