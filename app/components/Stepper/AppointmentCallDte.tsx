import React from 'react';
import { FormattedMessage } from 'react-intl';

import DteContactNumber from 'components/DteContactNumber';
import { ProductType } from 'types';

import getAppointmentType from './getAppointmentType';
import messages from './messages';

import './AppointmentCallDte.less';

interface IAppointmentCallDteProps {
  product: ProductType;
}

const AppointmentCallDte: React.FC<IAppointmentCallDteProps> = (
  props: IAppointmentCallDteProps,
): React.ReactElement => {
  const { product } = props;

  const serviceType = getAppointmentType(product);

  return (
    <div className="dte-wismo-appointment-call-dte">
      <div>
        <FormattedMessage {...messages[serviceType]} values={{ window: null }} />
      </div>
      <span className="message">
        <FormattedMessage
          {...messages.CALL_DTE}
          values={{
            phoneNumber: <DteContactNumber />,
          }}
        />
      </span>
    </div>
  );
};

export default AppointmentCallDte;
