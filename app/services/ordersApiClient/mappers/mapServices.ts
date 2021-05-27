import { IProduct, ProductTypes, ServiceType } from 'types';

import mapService from './mapService';

const mapServices = (products: IProduct[]): ServiceType[] =>
  products
    .filter((product: IProduct): boolean => ProductTypes.includes(product.productType))
    .map((product: IProduct): ServiceType => mapService(product));

export default mapServices;
