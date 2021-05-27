import React from 'react';

import LoadingIndicator from 'components/LoadingIndicator';
import OrderStatusView from 'components/OrderStatusView';
import ServiceRequestViewHeader from 'components/ServiceRequestViewHeader';
import { ITrackerState } from 'types';

import ErrorView from './ErrorView';

const selectView = (state: ITrackerState): React.ReactElement | null => {
  const { error, loading, order } = state;

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorView reason={error} />;
  }

  if (!order) {
    return null;
  }

  return (
    <div data-testid="order-status">
      <ServiceRequestViewHeader serviceRequestNumber={order.orderNumber.padEnd(10, '5')} />
      <OrderStatusView order={order} />
    </div>
  );
};

export default selectView;
