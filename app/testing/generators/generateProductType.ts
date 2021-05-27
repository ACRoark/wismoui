import { ProductType, ProductTypes } from 'types';

import generateRandomNumber from './generateRandomNumber';

const generateProductType = (): ProductType =>
  ProductTypes[generateRandomNumber(0, ProductTypes.length - 1)] as ProductType;

export default generateProductType;
