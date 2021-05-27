import { IProduct } from 'types';

import getActiveProduct from '../getActiveProduct';

describe('getActiveProduct', (): void => {
  it('should return the product when given a canceled service order event and the product is NOT canceled', (): void => {
    const productType = 'EFR_D1';
    const products: IProduct[] = [
      {
        docId: null,
        isCanceled: false,
        processedAtDate: '20200620',
        productType: 'EFR_D1',
        serviceDate: '20200630',
      },
      {
        docId: null,
        isCanceled: true,
        processedAtDate: '20200620',
        productType: 'EFR_D1_1',
        serviceDate: '2020-06-22',
      },
    ];

    const expected: IProduct = {
      docId: null,
      isCanceled: false,
      processedAtDate: '20200620',
      productType: 'EFR_D1',
      serviceDate: '20200630',
    };

    expect(getActiveProduct(productType, products)).toEqual(expected);
  });

  it('should return undefined when given a canceled service order event and the product is canceled', (): void => {
    const productType = 'EFR_D1_1';
    const products: IProduct[] = [
      {
        docId: null,
        isCanceled: false,
        processedAtDate: '20200620',
        productType: 'EFR_D1',
        serviceDate: '20200630',
      },
      {
        docId: null,
        isCanceled: true,
        processedAtDate: '20200620',
        productType: 'EFR_D1_1',
        serviceDate: '2020-06-22',
      },
    ];

    expect(getActiveProduct(productType, products)).toBe(undefined);
  });
});
