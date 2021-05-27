import React from 'react';
import { FormattedMessage } from 'react-intl';

import ColumnLayout from 'components/ColumnLayout';
import OrderConfirmationView from 'components/OrderConfirmationView';
import PhoneNumberField from 'components/PhoneNumberField';
import ServiceRequestBanner from 'components/ServiceRequestBanner';
import ServiceSummary from 'components/ServiceSummary';
import Stepper from 'components/Stepper';
import useFlags from 'hooks/useFlags';
import getServiceDate from 'utils/getServiceDate';
import sortOrderRequestUpdates from 'utils/sortOrderRequestUpdates';

import { IClosedDetails, IOrderRequest, OrderRequestStatus } from 'types';

import getLastOrderRequestStatus from './getLastOrderRequestStatus';
import messages from './messages';
import ServiceRequestTitle from './ServiceRequestTitle';
import showConfirmationView from './showConfirmationView';

import './index.less';

interface IServiceRequestViewProps {
  closedDetails: IClosedDetails | null;
  orderCreatedDate: string;
  phoneNumber: string;
  serviceRequest: IOrderRequest;
}

const ServiceRequestView: React.FC<IServiceRequestViewProps> = (
  props: IServiceRequestViewProps,
): React.ReactElement => {
  const { bug2263 } = useFlags();
  const { closedDetails, orderCreatedDate, phoneNumber, serviceRequest } = props;
  const serviceDate = getServiceDate(serviceRequest);

  const order: IOrderRequest = {
    ...serviceRequest,
    orderRequestStatusUpdates: serviceRequest.orderRequestStatusUpdates?.length
      ? sortOrderRequestUpdates(serviceRequest.orderRequestStatusUpdates)
      : [],
  };

  const lastOrderRequestStatus: OrderRequestStatus | string = getLastOrderRequestStatus(
    order.orderRequestStatusUpdates,
  );

  const RequestStatus = (): React.ReactElement => {
    const requestStatus = showConfirmationView(closedDetails, lastOrderRequestStatus, bug2263) ? (
      <OrderConfirmationView closedDetails={closedDetails} order={order} orderCreatedDate={orderCreatedDate} />
    ) : (
      <div className="stepper">
        <Stepper orderCreatedDate={orderCreatedDate} serviceRequest={order} />
      </div>
    );

    return requestStatus;
  };

  return (
    <ColumnLayout>
      <div className="dte-wismo-service-request-view">
        {!showConfirmationView(closedDetails, lastOrderRequestStatus, bug2263) && (
          <ServiceRequestBanner serviceRequest={serviceRequest} />
        )}
        <ServiceRequestTitle orderRequestType={serviceRequest.orderRequestType} />
        <RequestStatus />
        <div className="phone-number">
          <PhoneNumberField phoneNumber={phoneNumber} serviceDate={serviceDate || ''} />
        </div>
        <div className="service-summary">
          <h4 className="service-summary-label">
            <FormattedMessage {...messages.serviceSummary} />
          </h4>
          <ServiceSummary serviceRequest={serviceRequest} />
        </div>
      </div>
    </ColumnLayout>
  );
};

export default ServiceRequestView;
