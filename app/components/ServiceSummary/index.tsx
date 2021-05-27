import * as React from 'react';

import AddressFormField from 'components/AddressField';
import ProductsFormField from 'components/ProductsListField';

import IOrderRequest from 'types/IOrderRequest';

import './index.less';

interface IServiceSummaryProps {
  serviceRequest: IOrderRequest;
}

const ServiceSummary: React.FC<IServiceSummaryProps> = (props: IServiceSummaryProps): React.ReactElement => {
  const { address, products } = props.serviceRequest;

  return (
    <div className="dte-wismo-service-summary">
      <div className="dte-wismo-service-summary-field-container">
        <AddressFormField address={address} />
      </div>
      <div className="dte-wismo-service-summary-field-container">
        <ProductsFormField products={products} />
      </div>
    </div>
  );
};

export default ServiceSummary;
