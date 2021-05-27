import * as _ from 'lodash';

import createAppointmentList from 'components/Stepper/createAppointmentList';
import { IAppointmentList, IOrderRequest, IServiceOrderEvent } from 'types';
import filterVerificationEvents from 'utils/filterVerificationEvents';

import getAppointmentDates from './getAppointmentDates';

import { IBannerNotification } from './types';

const getBannerNotification = (serviceRequest: IOrderRequest): IBannerNotification => {
  const { verificationEvents } = serviceRequest;

  const appointmentList: IAppointmentList[] = createAppointmentList(serviceRequest);
  const dates = getAppointmentDates(appointmentList);
  const hasMultipleDates = dates.length > 1;

  const verificationCodes = ['AD', 'AN', 'CL', 'DR', 'ES', 'FV', 'FW', 'LD', 'PR', 'RE', 'RF', 'SC', 'WP'];
  const filteredVerificationEvents = filterVerificationEvents(verificationEvents, verificationCodes);

  if (filteredVerificationEvents.length) {
    const id = _.last(filteredVerificationEvents[0].verificationEventStatusUpdates).verificationCode;

    return {
      hasError: true,
      message: {
        id,
        values: null,
      },
    };
  }

  const allAppointments: IServiceOrderEvent[] = appointmentList.reduce(
    (appointments: IServiceOrderEvent[], appointmentsByDate: IAppointmentList): IServiceOrderEvent[] => {
      if (!appointmentsByDate.completed) {
        return appointments.concat(appointmentsByDate.appointments);
      }
      return appointments;
    },
    [],
  );

  const delayedErrorAppointment = allAppointments.find((appointment: IServiceOrderEvent): boolean =>
    ['DELAYED'].includes(`${appointment.latestStatus.serviceOrderEventStatus}`),
  );

  const errorAppointment = allAppointments.find((appointment: IServiceOrderEvent): boolean =>
    ['CALL_DTE', 'CANCELED_CGI', 'CANCELED_INC', 'PARTIAL_COMPLETION', 'RESCHEDULED'].includes(
      `${appointment.latestStatus.serviceOrderEventStatus}`,
    ),
  );

  if (delayedErrorAppointment || errorAppointment) {
    const id = `${
      delayedErrorAppointment?.latestStatus.serviceOrderEventStatus ||
      errorAppointment?.latestStatus.serviceOrderEventStatus
    }`;

    return {
      hasError: true,
      message: {
        id,
        values: null,
      },
    };
  }

  return {
    hasError: false,
    message: {
      id: hasMultipleDates ? `${serviceRequest.orderRequestType}_multiple_dates` : serviceRequest.orderRequestType,
      values: dates.length === 0 ? null : dates,
    },
  };
};

export default getBannerNotification;
