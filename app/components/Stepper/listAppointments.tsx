import React, { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import { IAppointmentList, IOrderRequest, IServiceOrderEvent } from 'types';
import { IStepDescription, StepperStatus } from './types';

import AppointmentList from './AppointmentList';
import createAppointmentList from './createAppointmentList';
import messages from './messages';

const listAppointments = (serviceRequest: IOrderRequest): IStepDescription => {
  const allAppointments: IAppointmentList[] = createAppointmentList(serviceRequest);
  let status = StepperStatus.Completed;

  allAppointments.forEach((appointmentList: IAppointmentList): void => {
    appointmentList.appointments.forEach((appointment: IServiceOrderEvent): void => {
      if (['CALL_DTE', 'DELAYED'].includes(appointment.latestStatus.serviceOrderEventStatus)) {
        status = StepperStatus.Error;
      }
    });
  });

  return {
    description: allAppointments.map(
      (appointmentList: IAppointmentList): ReactElement => (
        <AppointmentList
          appointments={appointmentList.appointments}
          completed={appointmentList.completed}
          date={appointmentList.date}
          key={appointmentList.key}
          showEditLink={appointmentList.showEditLink}
        />
      ),
    ),
    key: 'Scheduled',
    status,
    title: <FormattedMessage {...messages.scheduled} />,
  };
};

export default listAppointments;
