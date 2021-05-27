import * as _ from 'lodash';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';
import useModal from 'hooks/useModal';
import useThunkDispatch from 'hooks/useThunkDispatch';
import { trackButtonClick } from 'store/actions';
import IModalConfig from 'types/IModalConfig';
import IOrderRequest from 'types/IOrderRequest';
import getServiceDate from 'utils/getServiceDate';

import getServiceOrderEventsModal from './getServiceOrderEventsModal';
import getVerificationEventsModal from './getVerificationEventsModal';

import './index.less';
import messages from './messages';

interface IViewDetailsLinkProps {
  className?: string;
  orderCreatedDate: string;
  serviceRequest: IOrderRequest;
}

const ViewDetailsLink: React.FC<IViewDetailsLinkProps> = (props: IViewDetailsLinkProps): React.ReactElement => {
  const { className, orderCreatedDate, serviceRequest } = props;
  const { serviceOrderEvents, verificationEvents } = serviceRequest;

  let serviceOrderEventStatus;

  if (serviceOrderEvents && serviceOrderEvents.length) {
    if (_.last(serviceOrderEvents).latestStatus) {
      serviceOrderEventStatus = _.last(serviceOrderEvents).latestStatus.serviceOrderEventStatus;
    }
  }

  const dispatch = useThunkDispatch();
  const { showModal } = useModal();
  const serviceDate = getServiceDate(serviceRequest) || orderCreatedDate;
  const isVerificationComplete = serviceOrderEvents && serviceOrderEvents.length;

  const emptyModal = { content: null, title: null };

  const ServiceOrderEventsModal = serviceOrderEventStatus
    ? getServiceOrderEventsModal(serviceOrderEventStatus)
    : emptyModal;

  const VerificationEventsModal =
    verificationEvents && verificationEvents.length
      ? getVerificationEventsModal(verificationEvents, serviceDate)
      : emptyModal;

  const modal: IModalConfig = isVerificationComplete ? ServiceOrderEventsModal : VerificationEventsModal;

  const trackButtonAndOpenModal = (): void => {
    dispatch(trackButtonClick('view details link'));
    showModal(modal);
  };

  return (
    <Button className={className} onClick={trackButtonAndOpenModal} type="link">
      <FormattedMessage {...messages.title} />
    </Button>
  );
};

export default ViewDetailsLink;
