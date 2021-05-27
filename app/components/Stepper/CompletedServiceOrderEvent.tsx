import React, { FC, ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import DateStamp from 'components/DateStamp';
import { ProductType } from 'types';

import './CompletedServiceOrderEvent.less';
import getAppointmentType from './getAppointmentType';
import messages from './messages';

interface ICompletedServiceOrderEvent {
  date: string;
  key: string;
  product: ProductType;
}

const CompletedServiceOrderEvent: FC<ICompletedServiceOrderEvent> = (
  props: ICompletedServiceOrderEvent,
): ReactElement => {
  const { date, product } = props;

  const appointmentType = `completed_${getAppointmentType(product)}`;

  return (
    <span className="dte-wismo-completed-service-order-event">
      <FormattedMessage {...messages[appointmentType]} />
      <DateStamp format="short" value={date} />
    </span>
  );
};

export default CompletedServiceOrderEvent;
