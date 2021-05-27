import React from 'react';
import { FormattedMessage } from 'react-intl';

import Address from 'components/Address';
import Hyperlink from 'components/Hyperlink';
import OrderNumber from 'components/OrderNumber';
import { IOrderRequestInfo } from 'types';

import NewOrderListItemTitle from './NewOrderListItemTitle';
import OrdersListItemIcon from './OrderListItemIcon';

import messages from './messages';

interface IOrderListItemProps {
  orderNumber: string;
  request: IOrderRequestInfo;
}

const ChevronRight = () => (
  <svg
    className="bi bi-chevron-right"
    fill="currentColor"
    height="1em"
    viewBox="0 0 16 16"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clipRule="evenodd"
      d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z"
      fillRule="evenodd"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

const OrderListItem: React.FC<IOrderListItemProps> = (props: IOrderListItemProps): React.ReactElement => {
  const { orderNumber, request } = props;

  const { address, orderRequestType } = request;

  return (
    <div className="dte-wismo-order-list-item" id={`order-${orderNumber}`}>
      <div className="icon">
        <OrdersListItemIcon requestType={orderRequestType}/>
      </div>
      <div className="content">
        <div className="content-header">
          <NewOrderListItemTitle request={request}/>
          <div className="order-number">
            <span className="label">
              <FormattedMessage {...messages.orderNumber} />
            </span>
            <span className="value">
              <OrderNumber value={orderNumber}/>
            </span>
          </div>
        </div>
        <div className="address">
          <Address address={address}/>
        </div>
        <div className="details-link">
          <Hyperlink href={`/orders/${orderNumber}`}>
            <FormattedMessage {...messages.detailsLinkText} />
            <ChevronRight/>
          </Hyperlink>
        </div>
      </div>
    </div>
  );
};

export default OrderListItem;
