import { IProduct } from 'types';

import filterDuplicateProducts from '../filterDuplicateProducts';

describe('filterDuplicateProducts', (): void => {
  it('should return the last duplicate product when given multiples of the same product', (): void => {
    const products: IProduct[] = [
      {
        docId: '100006818824',
        isCanceled: true,
        processedAtDate: '20200824',
        productType: 'GFR_A_H',
        serviceDate: '20200819',
      },
      {
        docId: '100006818887',
        isCanceled: false,
        processedAtDate: '20200824',
        productType: 'GFR_A_H',
        serviceDate: '20200820',
      },
      {
        docId: '100002725016',
        isCanceled: false,
        processedAtDate: '20200820',
        productType: 'GFR_A_H',
        serviceDate: '20200820',
      },
    ];

    const expected: IProduct[] = [
      {
        docId: '100002725016',
        isCanceled: false,
        processedAtDate: '20200820',
        productType: 'GFR_A_H',
        serviceDate: '20200820',
      },
    ];

    expect(filterDuplicateProducts(products)).toEqual(expected);
  });
});
