import { IProduct } from 'types';

const getActiveProduct = (productType: string, products: IProduct[]): IProduct | undefined => {
  const activeProduct = products.find(
    (product: IProduct): boolean | undefined => product.productType === productType && product.isCanceled === false,
  );

  return activeProduct;
};

export default getActiveProduct;
