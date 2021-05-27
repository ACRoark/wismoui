import * as React from 'react';

import moment from 'moment';

import renderAutoDate from './renderAutoDate';
import renderLongDate from './renderLongDate';
import renderShortDate from './renderShortDate';
import { DateStampFormat } from './types';

interface IDateStampProps {
  format?: DateStampFormat;
  value: string;
}

const DateStamp: React.FC<IDateStampProps> = (props: IDateStampProps): React.ReactElement => {
  const { format = 'auto', value } = props;

  // Ended up using moment.js cuz the JavaScript Date object assumes the string is in UTC.
  // The result of new Date(value) is the value at midnight UTC.
  // When we subsequently render the date, it converts it to local time which actually makes it the previous day.
  // So, rather than apply some wonky work-around, use moment.js cuz it assumes locale time zone when the TZ is not specified.
  const date = moment(value);

  if (!date.isValid()) {
    throw new Error(`Invalid date value: ${value}`);
  }

  switch (format) {
    case 'auto':
      return renderAutoDate(date);
    case 'long':
      return renderLongDate(date);
    case 'short':
      return renderShortDate(date);
    default:
      throw new Error('Invalid format');
  }
};

export default DateStamp;
