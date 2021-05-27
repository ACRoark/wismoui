import moment, { Moment } from 'moment';
import React from 'react';

import renderLongDate from './renderLongDate';
import renderShortDate from './renderShortDate';

const renderAutoDate = (date: Moment): React.ReactElement => {
  const today = moment();

  if (date.isBefore(today, 'day')) {
    return renderShortDate(date);
  }

  return renderLongDate(date);
};

export default renderAutoDate;
