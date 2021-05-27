import React, { useState } from 'react';

import ServiceRequestView from 'components/ServiceRequestView';
import Tabs from 'components/Tabs';
import { IOrder, IOrderRequest } from 'types';

interface ITransferServiceViewProps {
  order: IOrder;
}

const sortRequests = (a: IOrderRequest, b: IOrderRequest): number => {
  if (a.orderRequestType === 'MIMO_START') {
    return b.orderRequestType === 'MIMO_STOP' ? -1 : 0;
  }

  return b.orderRequestType === 'MIMO_STOP' ? 0 : 1;
};

// TODO: Wrap in tabs
const TransferServiceView: React.FC<ITransferServiceViewProps> = (
  props: ITransferServiceViewProps,
): React.ReactElement => {
  const { order } = props;

  const [selected, setSelected] = useState('start');

  const selectionChanged = (str: string): void => {
    if (str === 'start') {
      setSelected('start');
    } else if (str === 'stop') {
      setSelected('stop');
    }
  };

  const { orderRequests } = order;

  const sortedRequests = orderRequests.sort(sortRequests);

  const startRequest = sortedRequests[0];
  const stopRequest = sortedRequests[1];

  return (
    <>
      <Tabs selectionChanged={selectionChanged} />
      {selected === 'start' && (
        <ServiceRequestView
          closedDetails={order.closedDetails}
          orderCreatedDate={order.createdAt}
          phoneNumber={startRequest.contactPhoneNumber}
          serviceRequest={startRequest}
        />
      )}
      {selected === 'stop' && (
        <ServiceRequestView
          closedDetails={order.closedDetails}
          orderCreatedDate={order.createdAt}
          phoneNumber={stopRequest.contactPhoneNumber}
          serviceRequest={stopRequest}
        />
      )}
    </>
  );
};

export default TransferServiceView;
