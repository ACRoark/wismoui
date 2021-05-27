import * as React from 'react';

import { IOrderSearchResult } from 'types';

import selectListItem from './selectListItem';

import './index.less';

interface IOrdersListProps {
  orders: IOrderSearchResult[];
}

const OrdersList: React.FC<IOrdersListProps> = (props: IOrdersListProps): React.ReactElement => {
  const { orders } = props;

  return orders.length === 0 ? (
    <></>
  ) : (
    <div className="dte-wismo-order-list">
      {orders.map(
        (order: IOrderSearchResult): React.ReactElement => (
          <React.Fragment key={order.orderNumber}>{selectListItem(order)}</React.Fragment>
        ),
      )}
    </div>
  );
};

export default OrdersList;
