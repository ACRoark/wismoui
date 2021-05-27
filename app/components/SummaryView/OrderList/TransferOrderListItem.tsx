import React from 'react';

import { IOrderSearchResult } from 'types';
import sortRequestsByType from 'utils/sortRequestsByType';

import OrderListItem from './OrderListItem';

interface ITransferOrderListItemProps {
  order: IOrderSearchResult;
}

const TransferOrderListItem: React.FC<ITransferOrderListItemProps> = (
  props: ITransferOrderListItemProps,
): React.ReactElement => {
  const { order } = props;

  const { orderNumber, orderRequests } = order;

  const sortedRequests = sortRequestsByType(orderRequests);

  return (
    <div className="dte-wismo-order-list-transfer-item">
      <OrderListItem orderNumber={orderNumber} request={sortedRequests[0]} />
      <OrderListItem orderNumber={orderNumber} request={sortedRequests[1]} />
    </div>
  );
};

export default TransferOrderListItem;
