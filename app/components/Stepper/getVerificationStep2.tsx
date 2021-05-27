import * as _ from 'lodash';
import React, { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import DateStamp from 'components/DateStamp';
import ViewDetailsLink from 'components/ViewDetailsLink';
import { Description, IOrderRequest, IOrderRequestStatusUpdate, IVerificationEvent } from 'types';
import filterVerificationEvents from 'utils/filterVerificationEvents';
import isOrderRequestStatusNeedsVerification from 'utils/isOrderRequestStatusNeedsVerification';
import sortVerificationEventStatusUpdates from 'utils/sortVerificationEventStatusUpdates';
import getBpemMessage from './getBpemMessage';
import getBpemMessage2 from './getBpemMessage2';
import messages from './messages';
import { IStepDescription, StepperStatus } from './types';

const getVerificationStep2 = (
  orderCreatedDate: string,
  serviceRequest: IOrderRequest,
  options?: {
    bug3665?: boolean;
    bug3883?: boolean;
  },
): IStepDescription => {
  const { orderRequestStatusUpdates, verificationEvents } = serviceRequest;

  let description: Description = '';
  let status = StepperStatus.Pending;
  const hasVerificationEvents = verificationEvents && verificationEvents.length;
  const needsVerification = isOrderRequestStatusNeedsVerification(serviceRequest);
  const verificationCodes = ['AD', 'AN', 'CL', 'DR', 'ES', 'FV', 'FW', 'LD', 'PR', 'RE', 'RF', 'SC'];
  const filteredVerificationEvents = filterVerificationEvents(verificationEvents, verificationCodes);
  const verifiedDate = options?.bug3665
    ? orderRequestStatusUpdates.find(
        (orderRequestStatusUpdate: IOrderRequestStatusUpdate): boolean =>
          orderRequestStatusUpdate.orderRequestStatus === 'NEEDS_VERIFICATION' ||
          orderRequestStatusUpdate.orderRequestStatus === 'PROCESSED' ||
          orderRequestStatusUpdate.orderRequestStatus === 'SCHEDULED',
      )?.createdAtDate
    : orderRequestStatusUpdates.find(
        (orderRequestStatusUpdate: IOrderRequestStatusUpdate): boolean =>
          orderRequestStatusUpdate.orderRequestStatus === 'PROCESSED' ||
          orderRequestStatusUpdate.orderRequestStatus === 'SCHEDULED',
      )?.createdAtDate;

  // necessary to prevent 'undefined' errors further down in the object
  if (hasVerificationEvents) {
    if (needsVerification) {
      // there is at least one BPEM
      if (filteredVerificationEvents.length) {
        // there is more than one BPEM
        if (filteredVerificationEvents.length > 1) {
          description = filteredVerificationEvents.map(
            (event: IVerificationEvent): ReactElement =>
              options?.bug3883
                ? getBpemMessage2(event, orderCreatedDate, serviceRequest)
                : getBpemMessage(event, orderCreatedDate, serviceRequest),
          );
          status = StepperStatus.Error;

          return {
            description,
            key: 'Verification',
            status,
            title: <FormattedMessage {...messages.verification} />,
          };
        }

        // if we're here, there is only one verification event, so we sort the
        // verificationEventStatusUpdates and just display the 'short' version of the bpem message
        const sortedVerificationEventStatusUpdates = sortVerificationEventStatusUpdates(
          filteredVerificationEvents[0].verificationEventStatusUpdates,
        );
        const latestVerificationCode = _.last(sortedVerificationEventStatusUpdates).verificationCode;
        description = options?.bug3883 ? getBpemMessage2(filteredVerificationEvents[0], orderCreatedDate, serviceRequest) : (
          <span>
            <FormattedMessage {...messages[`${latestVerificationCode}_description`]} />
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
          key: 'Verification',
          status,
          title: <FormattedMessage {...messages.verification} />,
        };
      }
    }
  }

  // There are no active Verification Step BPEMs and we have SCHEDULED or PROCESSED or NEEDS_VERIFICATION status
  if (filteredVerificationEvents.length === 0 && orderRequestStatusUpdates.length && verifiedDate) {
    description = (
      <span>
        <FormattedMessage {...messages.completed} />
        <DateStamp value={verifiedDate} />
      </span>
    );
    status = StepperStatus.Completed;

    return {
      description,
      key: 'Verification',
      status,
      title: <FormattedMessage {...messages.verification} />,
    };
  }

  return {
    description,
    key: 'Verification',
    status,
    title: <FormattedMessage {...messages.verification} />,
  };
};

export default getVerificationStep2;
