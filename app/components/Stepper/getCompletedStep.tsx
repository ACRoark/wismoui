import * as _ from 'lodash';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import ViewDetailsLink from 'components/ViewDetailsLink';
import { Description, IOrderRequest } from 'types';

import messages from './messages';
import { IStepDescription, StepperStatus } from './types';

const getCompletedStep = (orderCreatedDate: string, serviceRequest: IOrderRequest): IStepDescription => {
  const { orderRequestStatusUpdates } = serviceRequest;
  let description: Description = '';
  let status = StepperStatus.Pending;

  if (orderRequestStatusUpdates.length && _.last(orderRequestStatusUpdates).orderRequestStatus === 'CANCELED') {
    description = (
      <span>
        <FormattedMessage {...messages[`${_.last(orderRequestStatusUpdates).orderRequestStatus}_description`]} />
        <ViewDetailsLink
          className="view-details-link"
          orderCreatedDate={orderCreatedDate}
          serviceRequest={serviceRequest}
        />
      </span>
    );
    status = StepperStatus.Error;

    return {
      description,
      key: 'Completed',
      status,
      title: <FormattedMessage {...messages.completed} />,
    };
  }

  return {
    description,
    key: 'Completed',
    status,
    title: <FormattedMessage {...messages.completed} />,
  };
};

export default getCompletedStep;
