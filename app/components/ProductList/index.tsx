import * as React from 'react';

import ProductName from 'components/ProductName';
import { IProduct, ProductType, ProductTypes } from 'types';
import filterDuplicateProducts from './filterDuplicateProducts';

interface IProductListProps {
  products: IProduct[] | null;
}

const isKnown = (productType: ProductType): boolean => ProductTypes.includes(productType);

const ProductList: React.FC<IProductListProps> = (props: IProductListProps): React.ReactElement => {
  const { products } = props;

  if (!products) {
    return <></>;
  }

  let productList;

  const filteredProducts = products.filter(
    (product: IProduct): boolean => !product.isCanceled && isKnown(product.productType),
  );
  const filteredDuplicates = filterDuplicateProducts(filteredProducts);
  productList = filteredDuplicates.map(
    (product: IProduct, index: number): React.ReactElement => (
      <React.Fragment key={product.productType}>
        <ProductName productType={product.productType}/>
        {index < filteredDuplicates.length - 1 ? ', ' : null}
      </React.Fragment>
    ),
  );

  return <>{productList}</>;
};

export default ProductList;
