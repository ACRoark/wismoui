import React, { ReactElement } from 'react';

import IServiceOrderEvent from 'types/IServiceOrderEvent';

import Appointment from './Appointment';
import AppointmentCallDte from './AppointmentCallDte';
import AppointmentDelayed from './AppointmentDelayed';
import AppointmentRescheduled from './AppointmentRescheduled';

const mapAppointments = (serviceOrderEvents: IServiceOrderEvent[], us3273?: boolean): ReactElement[] =>
  serviceOrderEvents.map(
    (serviceOrderEvent: IServiceOrderEvent): ReactElement => {
      const {
        appointment: { date, slotType },
        product,
        latestStatus: { serviceOrderEventStatus },
      } = serviceOrderEvent;

      if (us3273) {
        switch (serviceOrderEventStatus) {
          case 'CALL_DTE':
            return <AppointmentCallDte key={product} product={product} />;

          case 'DELAYED':
            return <AppointmentDelayed date={date} key={product} product={product} />;

          case 'RESCHEDULED':
            return <AppointmentRescheduled date={date} key={product} product={product} slotType={slotType} />;

          default:
            return <Appointment key={product} slotType={slotType} product={product} />;
        }
      }

      return <Appointment key={product} slotType={slotType} product={product} />;
    },
  );

export default mapAppointments;
