import React from 'react';

import DateStamp from 'components/DateStamp';
import EditServiceDateLink from 'components/EditServiceDateLink';

import './AppointmentDate1599.less';

interface IAppointmentDateProps {
  date: string;
  showEditLink?: boolean;
}

const AppointmentDate1599: React.FC<IAppointmentDateProps> = (props: IAppointmentDateProps): React.ReactElement => {
  const { date, showEditLink = true } = props;

  return (
    <div className="dte-wismo-appointment-date">
      <DateStamp value={date} />
      {showEditLink && <EditServiceDateLink wantDate={date} />}
    </div>
  );
};

export default AppointmentDate1599;
