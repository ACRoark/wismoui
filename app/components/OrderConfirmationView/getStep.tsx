import React from 'react';

import CancelledStep from 'components/CancelledStep';
import CompletedStep from 'components/CompletedStep';
import { IClosedDetails, IOrderRequest } from 'types';
import findServiceOrderEventByStatus from 'utils/findServiceOrderEventByStatus';

import sortByServiceDate from './sortByServiceDate';

const getStep = (closedDetails: IClosedDetails | null, order: IOrderRequest): React.ReactElement => {
  const { address, orderRequestType } = order;

  if (closedDetails && closedDetails.reason === 'CANCELED') {
    return <CancelledStep address={address} cancelDate={closedDetails.closedAt} requestType={orderRequestType} />;
  }

  const orderStatus = findServiceOrderEventByStatus(order, 'COMPLETED');

  const sortedProducts = sortByServiceDate(order.products);

  const completedProduct = sortedProducts.find((product) => !product.isCanceled);

  if (orderStatus) {
    return (
      <CompletedStep
        address={address}
        completeDate={completedProduct?.serviceDate || orderStatus.createdAtDate}
        requestType={orderRequestType}
      />
    );
  }
  return (
    <CompletedStep
      address={address}
      completeDate={
        completedProduct?.serviceDate ||
        order.orderRequestStatusUpdates[order.orderRequestStatusUpdates.length - 1].createdAtDate
      }
      requestType={orderRequestType}
    />
  );
};

export default getStep;
