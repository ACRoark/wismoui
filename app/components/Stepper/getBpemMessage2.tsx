import * as _ from 'lodash';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import getVerificationEventModal from 'components/ViewDetailsLink/getVerificationEventModal';
import ViewSubstatusDetailsLink from 'components/ViewDetailsLink/ViewSubstatusDetailsLink';
import IOrderRequest from 'types/IOrderRequest';
import IVerificationEvent from 'types/IVerificationEvent';

import messages from './messages';

const getBpemMessage2 = (
  event: IVerificationEvent,
  orderCreatedDate: string,
  serviceRequest: IOrderRequest,
): React.ReactElement => {
  const { verificationEvents } = serviceRequest;

  if (['R984', 'R985'].includes(event.verificationCategory)) {
    const paymentNeededModal = getVerificationEventModal(event, verificationEvents, orderCreatedDate);

    return (
      <div className="verification-content-error" key={event.verificationEventId}>
        <FormattedMessage
          {...messages[`${_.last(event.verificationEventStatusUpdates).verificationCode}_description`]}
        />
        <ViewSubstatusDetailsLink className="view-details-link" modal={paymentNeededModal} />
      </div>
    );
  }

  const modal = getVerificationEventModal(event, verificationEvents, orderCreatedDate);

  return (
    <div className="verification-content-error" key={event.verificationEventId}>
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
      <ViewSubstatusDetailsLink className="view-details-link" modal={modal} />
    </div>
  );
};

export default getBpemMessage2;
