import React from 'react';

import InvalidServiceView from 'components/InvalidServiceView';
import ServiceRequestView from 'components/ServiceRequestView';
import TransferServiceView from 'components/TransferServiceView';

import { IOrder } from 'types';

interface IOrderStatusViewProps {
  order: IOrder;
}

const OrderStatusView: React.FC<IOrderStatusViewProps> = (props: IOrderStatusViewProps): React.ReactElement => {
  const { order } = props;

  if (order) {
    switch (order.orderType) {
      case 'MIMO_START':
        return (
          <ServiceRequestView
            closedDetails={order.closedDetails}
            orderCreatedDate={order.createdAt}
            phoneNumber={order.orderRequests[0].contactPhoneNumber}
            serviceRequest={order.orderRequests[0]}
          />
        );
      case 'MIMO_STOP':
        return (
          <ServiceRequestView
            closedDetails={order.closedDetails}
            orderCreatedDate={order.createdAt}
            phoneNumber={order.orderRequests[0].contactPhoneNumber}
            serviceRequest={order.orderRequests[0]}
          />
        );
      case 'MIMO_TRANSFER':
        return <TransferServiceView order={order} />;
      default:
        break;
    }
  }

  return <InvalidServiceView />;
};

export default OrderStatusView;
