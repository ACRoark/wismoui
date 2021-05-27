import React from 'react';
import { FormattedMessage } from 'react-intl';

import DateStamp from 'components/DateStamp';
import IOrderRequest from 'types/IOrderRequest';
import messages from './messages';
import { IStepDescription, StepperStatus } from './types';

const getDescription = (orderCreatedDate: string, orderRequest: IOrderRequest): React.ReactElement => {
  const orderCreated = <DateStamp format="short" value={orderCreatedDate} />;

  if (orderRequest.orderRequestStatusUpdates.length === 0) {
    return (
      <span>
        <div>{orderCreated}</div>
        <FormattedMessage {...messages.newOrder} />
      </span>
    );
  }

  return orderCreated;
};

const getRequestedStep = (
  orderCreatedDate: string,
  serviceRequest?: IOrderRequest,
): IStepDescription => {
  if (serviceRequest && serviceRequest.orderRequestStatusUpdates.length === 0) {
    return {
      description: getDescription(orderCreatedDate, serviceRequest),
      key: 'Request Received',
      status: StepperStatus.Completed,
      title: <FormattedMessage {...messages.request} />,
    };
  }

  return {
      description: <DateStamp format="short" value={orderCreatedDate} />,
      key: 'Request Received',
      status: StepperStatus.Completed,
      title: <FormattedMessage {...messages.request} />,
  };
};

export default getRequestedStep;
