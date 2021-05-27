import { Moment } from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

// Do not sort these alphabetically as the index must match what is returned from Date.getDay()
const daysOfTheWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

// Do not sort these alphabetically as the index must match what is returned from Date.getMonth()
const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

const renderLongDate = (moment: Moment): React.ReactElement => {
  const date = moment.toDate();

  const day = date.getDate();
  const dayOfTheWeek = date.getDay();
  const month = date.getMonth();

  return (
    <>
      <FormattedMessage {...messages[daysOfTheWeek[dayOfTheWeek]]} />
      ,&nbsp;
      <FormattedMessage {...messages[months[month]]} />
      &nbsp;{day}
    </>
  );
};

export default renderLongDate;
