import * as _ from 'lodash';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import ViewDetailsLink from 'components/ViewDetailsLink';
import IOrderRequest from 'types/IOrderRequest';
import IVerificationEvent from 'types/IVerificationEvent';

import messages from './messages';

const getBpemMessage = (
  event: IVerificationEvent,
  orderCreatedDate: string,
  serviceRequest: IOrderRequest,
): React.ReactElement => {
  if (['R984', 'R985'].includes(event.verificationCategory)) {
    return (
      <>
        <FormattedMessage
          {...messages[`${_.last(event.verificationEventStatusUpdates).verificationCode}_description`]}
        />
        <ViewDetailsLink
          className="view-details-link"
          orderCreatedDate={orderCreatedDate}
          serviceRequest={serviceRequest}
        />
      </>
    );
  }

  return (
    <>
      <FormattedMessage
        {...messages.multiple_bpem_description}
        values={{
          verificationCode: (
            <FormattedMessage
              {...messages[`${_.last(event.verificationEventStatusUpdates).verificationCode}_description`]}
            />
          ),
          verificationCategory: <FormattedMessage {...messages[`${event.verificationCategory}_description`]} />,
        }}
      />
      <ViewDetailsLink
        className="view-details-link"
        orderCreatedDate={orderCreatedDate}
        serviceRequest={serviceRequest}
      />
    </>
  );
};

export default getBpemMessage;
