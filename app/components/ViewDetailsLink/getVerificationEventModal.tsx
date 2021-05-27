import * as _ from 'lodash';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import IModalConfig from 'types/IModalConfig';
import IVerificationEvent from 'types/IVerificationEvent';

import './index.less';
import messages from './messages';
import ModalContent from './ModalContent';

const getVerificationEventModal = (
  event: IVerificationEvent,
  events: IVerificationEvent[],
  orderCreatedDate: string,
): IModalConfig => {
  const code = _.last(event?.verificationEventStatusUpdates).verificationCode;

  return {
    className: 'dte-wismo-modal',
    content: <ModalContent event={event} events={events} orderCreatedDate={orderCreatedDate} />,
    title: <FormattedMessage {...messages[`${code}_title`]} />,
  };
};

export default getVerificationEventModal;
