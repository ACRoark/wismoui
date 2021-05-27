import React from 'react';

import StartIcon from 'images/StartIcon';
import StopIcon from 'images/StopIcon';
import OrderRequestType from 'types/OrderRequestType';

interface IOrderListItemIconProps {
  requestType: OrderRequestType;
}

const OrderListItemIcon: React.FC<IOrderListItemIconProps> = (props: IOrderListItemIconProps): React.ReactElement => {
  const { requestType } = props;

  switch (requestType) {
    case 'MIMO_START':
      return <StartIcon className="dte-wismo-order-list-item-icon" title="start order" />;
    case 'MIMO_STOP':
      return <StopIcon className="dte-wismo-order-list-item-icon" title="stop order" />;
    default:
      throw new Error('Invalid order type');
  }
};

export default OrderListItemIcon;
