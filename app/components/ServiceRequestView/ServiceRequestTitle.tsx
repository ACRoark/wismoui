import React, { FC, ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import OrderRequestType from 'types/OrderRequestType';
import './index.less';
import messages from './messages';

interface IServiceRequestTitle {
  orderRequestType: OrderRequestType;
}

const ServiceRequestTitle: FC<IServiceRequestTitle> = (props: IServiceRequestTitle): ReactElement => {
  const { orderRequestType } = props;

  return (
    <div className="dte-wismo-service-request-title">
      {orderRequestType === 'MIMO_START' ? (
        <FormattedMessage {...messages.startTitle} />
      ) : (
        <FormattedMessage {...messages.stopTitle} />
      )}
    </div>
  );
};

export default ServiceRequestTitle;
