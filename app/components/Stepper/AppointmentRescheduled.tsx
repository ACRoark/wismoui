import React from 'react';
import { FormattedMessage } from 'react-intl';

import DateStamp from 'components/DateStamp';
import { ProductType, SlotType } from 'types';

import Appointment from './Appointment';
import messages from './messages';

import './AppointmentRescheduled.less';

interface IAppointmentRescheduledProps {
  date: string;
  product: ProductType;
  slotType: SlotType;
}

const AppointmentRescheduled: React.FC<IAppointmentRescheduledProps> = (
  props: IAppointmentRescheduledProps,
): React.ReactElement => {
  const { date, product, slotType } = props;

  return (
    <div className="dte-wismo-appointment-rescheduled">
      <span className="message">
        <FormattedMessage
          {...messages.RESCHEDULED}
          values={{
            date: <DateStamp format="long" value={date} />,
          }}
        />
      </span>
      <Appointment key={product} slotType={slotType} product={product} />
    </div>
  );
};

export default AppointmentRescheduled;
