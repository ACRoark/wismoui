import moment, { Moment } from 'moment';

export const today = (): Moment => moment();

export const tomorrow = (): Moment => {
  const date = today();

  date.add(1, 'day');

  return date;
};

export const yesterday = (): Moment => {
  const date = today();

  date.subtract(1, 'day');

  return date;
};
