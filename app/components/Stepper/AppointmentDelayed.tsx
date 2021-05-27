import React from 'react';
import { FormattedMessage } from 'react-intl';

import DateStamp from 'components/DateStamp';
import getServiceOrderEventsModal2 from 'components/ViewDetailsLink/getServiceOrderEventsModal2';
import ViewSubstatusDetailsLink from 'components/ViewDetailsLink/ViewSubstatusDetailsLink';
import useConfig from 'hooks/useConfig';
import { ProductType } from 'types';

import getAppointmentType from './getAppointmentType';
import messages from './messages';

import './AppointmentDelayed.less';

interface IAppointmentDelayedProps {
  date: string;
  product: ProductType;
}

const AppointmentDelayed: React.FC<IAppointmentDelayedProps> = (
  props: IAppointmentDelayedProps,
): React.ReactElement => {
  const { date, product } = props;
  const { urls } = useConfig();

  const serviceType = getAppointmentType(product);

  const modal = getServiceOrderEventsModal2('DELAYED', urls.backToMIMO);

  return (
    <div className="dte-wismo-appointment-delayed">
      <span className="message">
        <FormattedMessage
          {...messages.DELAYED}
          values={{
            date: <DateStamp format="long" value={date} />,
          }}
        />
        <ViewSubstatusDetailsLink className="view-details-link" modal={modal} />
      </span>
      <div>
        <FormattedMessage {...messages[serviceType]} values={{ window: null }} />
      </div>
    </div>
  );
};

export default AppointmentDelayed;
