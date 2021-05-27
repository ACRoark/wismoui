import { IProduct } from 'types';

const filterDuplicateProducts = (products: IProduct[]): IProduct[] => {
  const cache = {};
  const filteredProducts: IProduct[] = [];

  for (let i = products.length - 1; i >= 0; i--) {
    if (!cache[products[i].productType]) {
      cache[products[i].productType] = true;
      filteredProducts.push(products[i]);
    }
  }

  return filteredProducts;
};

export default filterDuplicateProducts;
