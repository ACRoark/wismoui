import { Moment } from 'moment';
import React from 'react';
import { FormattedDate } from 'react-intl';

const renderShortDate = (moment: Moment): React.ReactElement => (
  <FormattedDate day="2-digit" month="2-digit" value={moment.toDate()} year="2-digit" />
);

export default renderShortDate;
