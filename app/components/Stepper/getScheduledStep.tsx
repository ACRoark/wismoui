import * as _ from 'lodash';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import DateStamp from 'components/DateStamp';
import DteContactNumber from 'components/DteContactNumber';
import EditServiceDateLink from 'components/EditServiceDateLink';
import ViewDetailsLink from 'components/ViewDetailsLink';
import { Description, IOrderRequest, IVerificationEvent } from 'types';
import filterVerificationEvents from 'utils/filterVerificationEvents';
import sortByCreatedAtDateAndTime from 'utils/sortByCreatedAtDateAndTime';
import sortVerificationEventStatusUpdates from 'utils/sortVerificationEventStatusUpdates';

import AppointmentDate from './AppointmentDate';
import filterByMostRecentProducts from './filterByMostRecentProducts';
import getBpemMessage from './getBpemMessage';
import getBpemMessage2 from './getBpemMessage2';
import listAppointments from './listAppointments';
import mapAppointments from './mapAppointments';
import messages from './messages';
import sortByAppointmentTime from './sortByAppointmentTime';
import { IStepDescription, StepperStatus } from './types';

interface IGetScheduledStepOptions {
  bug3883?: boolean;
  us1599?: boolean;
  us1946?: boolean;
  us3273?: boolean;
}

const getScheduledStep = (
  orderCreatedDate: string,
  serviceRequest: IOrderRequest,
  options: IGetScheduledStepOptions,
): IStepDescription => {
  const { bug3883, us1599, us1946, us3273 } = options;
  const { orderRequestStatusUpdates, serviceOrderEvents, verificationEvents } = serviceRequest;
  let description: Description = '';

  const initialStep = {
    key: 'Scheduled',
    status: StepperStatus.Pending,
    title: <FormattedMessage {...messages.scheduled} />,
  };

  const hasVerificationEvents = verificationEvents && verificationEvents.length;
  const sortedVerificationEventStatusUpdates =
    hasVerificationEvents &&
    sortVerificationEventStatusUpdates(_.last(verificationEvents).verificationEventStatusUpdates);
  const lastOrderRequestStatus =
    orderRequestStatusUpdates.length && _.last(orderRequestStatusUpdates).orderRequestStatus;
  const verificationCode = hasVerificationEvents && _.last(sortedVerificationEventStatusUpdates).verificationCode;
  const verificationCodes: string[] = ['AP', 'PM', 'WP'];

  if (hasVerificationEvents) {
    if (us1946) {
      const filteredVerificationEvents: IVerificationEvent[] = filterVerificationEvents(
        verificationEvents,
        verificationCodes,
      );

      // we have one or more active BPEMs
      if (filteredVerificationEvents.length) {
        const lastFilteredVerificationEventStatusUpdate = _.last(
          sortVerificationEventStatusUpdates(filteredVerificationEvents[0].verificationEventStatusUpdates),
        );

        if (
          (lastOrderRequestStatus === 'NEEDS_VERIFICATION' &&
            verificationCodes.includes(lastFilteredVerificationEventStatusUpdate.verificationCode) &&
            ['ACTIVE', 'COMPLETED'].includes(lastFilteredVerificationEventStatusUpdate.verificationEventStatus)) ||
          (lastOrderRequestStatus === 'PROCESSED' &&
            verificationCodes.includes(lastFilteredVerificationEventStatusUpdate.verificationCode) &&
            lastFilteredVerificationEventStatusUpdate.verificationEventStatus === 'ACTIVE')
        ) {
          // We have multiple BPEMs to deal with
          if (filteredVerificationEvents.length > 1) {
            description = filteredVerificationEvents.map(
              (event: IVerificationEvent): React.ReactElement =>
                bug3883
                  ? getBpemMessage2(event, orderCreatedDate, serviceRequest)
                  : getBpemMessage(event, orderCreatedDate, serviceRequest),
            );

            return {
              ...initialStep,
              description,
              status: StepperStatus.Error,
            };
          }

          description = options?.bug3883 ? (
            getBpemMessage2(filteredVerificationEvents[0], orderCreatedDate, serviceRequest)
          ) : (
            <span>
              <FormattedMessage
                {...messages[`${lastFilteredVerificationEventStatusUpdate.verificationCode}_description`]}
              />
              <ViewDetailsLink
                className="view-details-link"
                orderCreatedDate={orderCreatedDate}
                serviceRequest={serviceRequest}
              />
            </span>
          );

          return {
            ...initialStep,
            description,
            status: StepperStatus.Error,
          };
        }
      }
    }

    if (!us1946) {
      if (
        (lastOrderRequestStatus === 'NEEDS_VERIFICATION' &&
          verificationCodes.includes(verificationCode) &&
          ['ACTIVE', 'COMPLETED'].includes(_.last(sortedVerificationEventStatusUpdates).verificationEventStatus)) ||
        (lastOrderRequestStatus === 'PROCESSED' &&
          verificationCodes.includes(verificationCode) &&
          _.last(sortedVerificationEventStatusUpdates).verificationEventStatus === 'ACTIVE')
      ) {
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

        return {
          ...initialStep,
          description,
          status: StepperStatus.Error,
        };
      }
    }
  }

  if (serviceOrderEvents.length) {
    let sortedServiceOrderEvents;
    let serviceOrderEventStatus;

    if (us1599) {
      return listAppointments(serviceRequest);
    }

    sortedServiceOrderEvents = sortByAppointmentTime(
      filterByMostRecentProducts(sortByCreatedAtDateAndTime(serviceOrderEvents)),
    );

    serviceOrderEventStatus = _.last(sortedServiceOrderEvents).latestStatus.serviceOrderEventStatus;

    const date = _.last(sortedServiceOrderEvents).appointment.date;

    if (['DELAYED', 'CALL_DTE', 'RESCHEDULED', 'PARTIAL_COMPLETION'].indexOf(serviceOrderEventStatus) > -1) {
      description = (
        <span>
          <FormattedMessage
            {...messages[serviceOrderEventStatus]}
            values={{
              phoneNumber: <DteContactNumber />,
              appointmentDate: <AppointmentDate date={date} />,
            }}
          />
          {serviceOrderEventStatus === 'DELAYED' && (
            <ViewDetailsLink
              className="view-details-link"
              orderCreatedDate={orderCreatedDate}
              serviceRequest={serviceRequest}
            />
          )}
        </span>
      );

      return {
        ...initialStep,
        description,
        status: StepperStatus.Error,
      };
    }

    return {
      ...initialStep,
      description: (
        <>
          <AppointmentDate date={date} />
          {mapAppointments(sortedServiceOrderEvents, us3273)}
        </>
      ),
      status: StepperStatus.Completed,
    };
  }

  if (
    orderRequestStatusUpdates.length &&
    lastOrderRequestStatus === 'PROCESSED' &&
    !hasVerificationEvents &&
    !serviceOrderEvents.length &&
    serviceRequest.products.length
  ) {
    return {
      ...initialStep,
      description: (
        <div className="single-product">
          <DateStamp value={serviceRequest.products[0].serviceDate} />
          <EditServiceDateLink wantDate={serviceRequest.products[0].serviceDate} />
        </div>
      ),
      status: StepperStatus.Completed,
    };
  }

  return { ...initialStep, description };
};

export default getScheduledStep;
