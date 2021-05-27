import { IProduct, ServiceType } from 'types';

const mapService = (product: IProduct): ServiceType => product.productType;

export default mapService;
