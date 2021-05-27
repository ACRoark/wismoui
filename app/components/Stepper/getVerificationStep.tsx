import * as _ from 'lodash';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import DateStamp from 'components/DateStamp';
import ViewDetailsLink from 'components/ViewDetailsLink';
import { Description, IOrderRequest, IOrderRequestStatusUpdate } from 'types';
import isOrderRequestStatusNeedsVerification from 'utils/isOrderRequestStatusNeedsVerification';
import sortVerificationEventStatusUpdates from 'utils/sortVerificationEventStatusUpdates';
import messages from './messages';
import { IStepDescription, StepperStatus } from './types';

const getVerificationStep = (orderCreatedDate: string, serviceRequest: IOrderRequest): IStepDescription => {
  const { orderRequestStatusUpdates, verificationEvents } = serviceRequest;

  let description: Description = '';
  let status = StepperStatus.Pending;
  const hasVerificationEvents = verificationEvents && verificationEvents.length;
  const needsVerification = isOrderRequestStatusNeedsVerification(serviceRequest);
  const sortedVerificationEventStatusUpdates =
    hasVerificationEvents &&
    sortVerificationEventStatusUpdates(_.last(verificationEvents).verificationEventStatusUpdates);
  const verificationCode = hasVerificationEvents && _.last(sortedVerificationEventStatusUpdates).verificationCode;

  if (hasVerificationEvents) {
    if (needsVerification && !['AP', 'PM', 'WP'].includes(verificationCode)) {
      description = (
        <span>
          <FormattedMessage {...messages[`${verificationCode}_description`]} />
          <ViewDetailsLink
            className="view-details-link"
            orderCreatedDate={orderCreatedDate}
            serviceRequest={serviceRequest}
          />
        </span>
      );
      status = StepperStatus.Error;
    } else {
      description = (
        <span>
          <FormattedMessage {...messages.completed} />
          &nbsp;
          <DateStamp value={_.last(sortedVerificationEventStatusUpdates).createdAtDate} />
        </span>
      );
      status = StepperStatus.Completed;
    }
  }

  const verifiedDate = orderRequestStatusUpdates.find(
    (orderRequestStatusUpdate: IOrderRequestStatusUpdate): boolean =>
      orderRequestStatusUpdate.orderRequestStatus === 'PROCESSED' ||
      orderRequestStatusUpdate.orderRequestStatus === 'SCHEDULED',
  )?.createdAtDate;

  if (!hasVerificationEvents && orderRequestStatusUpdates.length && verifiedDate) {
    description = (
      <span>
        <FormattedMessage {...messages.completed} />
        &nbsp;
        <DateStamp value={verifiedDate} />
      </span>
    );
    status = StepperStatus.Completed;
  }

  return {
    description,
    key: 'Verification',
    status,
    title: <FormattedMessage {...messages.verification} />,
  };
};

export default getVerificationStep;
