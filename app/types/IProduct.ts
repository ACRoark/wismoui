import ProductType from './ProductType';

interface IProduct {
  docId?: string | null;
  isCanceled?: boolean;
  processedAtDate?: string | null;
  productType: ProductType;
  serviceDate: string;
}

export default IProduct;
