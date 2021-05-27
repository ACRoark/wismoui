import classnames from 'classnames';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { IOrderRequestStatusUpdate, OrderRequestType } from 'types';

import messages from './messages';

interface IOrderListItemTitleProps {
  currentOrderRequestStatus: IOrderRequestStatusUpdate | null;
  orderRequestType: OrderRequestType;
}

const OrderListItemTitle: React.FC<IOrderListItemTitleProps> = (
  props: IOrderListItemTitleProps,
): React.ReactElement => {
  const { currentOrderRequestStatus, orderRequestType } = props;

  const hasBPEM = currentOrderRequestStatus && currentOrderRequestStatus.orderRequestStatus === 'NEEDS_VERIFICATION';

  const titleClass = classnames('title', { error: hasBPEM });

  return (
    <div className={titleClass}>
      <FormattedMessage
        {...messages[orderRequestType]}
        values={{
          bpem: '',
          date: '',
          prefix: hasBPEM ? '! ' : '',
        }}
      />
    </div>
  );
};

export default OrderListItemTitle;
