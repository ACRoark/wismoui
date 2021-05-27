/**
 *
 * ProductName
 *
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { ProductType, ProductTypes } from 'types';

import messages from './messages';

interface IProductNameProps {
  productType: string;
}

const ProductName: React.FC<IProductNameProps> = (props: IProductNameProps): React.ReactElement | null => {
  const { productType } = props;

  if (ProductTypes.includes(productType as ProductType)) {
    const message = messages[productType];

    return <FormattedMessage {...message} />;
  }

  return null;
};

export default ProductName;
