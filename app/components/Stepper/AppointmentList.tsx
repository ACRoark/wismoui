import React, { FC, ReactElement } from 'react';

import useFlags from 'hooks/useFlags';
import { IAppointmentList, IServiceOrderEvent } from 'types';

import AppointmentDate1599 from './AppointmentDate1599';
import CompletedServiceOrderEvent from './CompletedServiceOrderEvent';
import mapAppointments from './mapAppointments';
import showAppointmentDate from './showAppointmentDate';

import './AppointmentList.less';

const AppointmentList: FC<IAppointmentList> = (props: IAppointmentList): ReactElement => {
  const { appointments, completed, date, showEditLink } = props;
  const { us3273 } = useFlags();
  const showDate = showAppointmentDate(appointments);

  if (completed) {
    return (
      <div className="dte-wismo-appointment-list">
        {appointments.map(
          (completedAppointment: IServiceOrderEvent): ReactElement => (
            <CompletedServiceOrderEvent
              date={completedAppointment.appointment.date}
              key={completedAppointment.product}
              product={completedAppointment.product}
            />
          ),
        )}
      </div>
    );
  }

  return (
    <div className="dte-wismo-appointment-list">
      {showDate && <AppointmentDate1599 date={date} showEditLink={showEditLink} />}
      {mapAppointments(appointments, us3273)}
    </div>
  );
};

export default AppointmentList;
