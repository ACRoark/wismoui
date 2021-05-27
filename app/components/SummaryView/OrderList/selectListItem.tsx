import React from 'react';

import { IOrderSearchResult } from 'types';

import OrderListItem from './OrderListItem';
import TransferOrderListItem from './TransferOrderListItem';

const selectListItem = (order: IOrderSearchResult): React.ReactElement => {
  switch (order.orderType) {
    case 'MIMO_START':
    case 'MIMO_STOP':
      return <OrderListItem orderNumber={order.orderNumber} request={order.orderRequests[0]} />;
    case 'MIMO_TRANSFER':
      return <TransferOrderListItem order={order} />;
    default:
      throw new Error('Invalid order type');
  }
};

export default selectListItem;
