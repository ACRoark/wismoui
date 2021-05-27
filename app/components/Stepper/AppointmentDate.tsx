import React from 'react';

import DateStamp from 'components/DateStamp';
import EditServiceDateLink from 'components/EditServiceDateLink';

import './AppointmentDate.less';

interface IAppointmentDateProps {
  date: string;
}

const AppointmentDate: React.FC<IAppointmentDateProps> = (props: IAppointmentDateProps): React.ReactElement => {
  const { date } = props;

  return (
    <div className="dte-wismo-appointment-date">
      <DateStamp value={date} />
      <EditServiceDateLink wantDate={date} />
    </div>
  );
};

export default AppointmentDate;
