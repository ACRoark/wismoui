import React from 'react';
import { FormattedMessage } from 'react-intl';

import { SlotType } from 'types';

import getAppointmentType from './getAppointmentType';
import getTime from './getTime';
import messages from './messages';

interface IAppointmentProps {
  product: string;
  slotType: SlotType;
}

const Appointment: React.FC<IAppointmentProps> = (props: IAppointmentProps): React.ReactElement => {
  const { product, slotType } = props;

  const time = getTime(slotType);
  const serviceType = getAppointmentType(product);

  return (
    <>
      {product && slotType && slotType !== 'AN' && (
        <div>
          <FormattedMessage {...messages[serviceType]} values={{ window: time }} />
        </div>
      )}
    </>
  );
};

export default Appointment;
