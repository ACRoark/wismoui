import moment, { Moment } from 'moment';

class DateTime {
  value: Moment;

  constructor(date: string, time: string) {
    if (!date) {
      throw new Error('You must specify a valid date');
    }

    if (!time) {
      throw new Error('You must specify a valid time');
    }

    this.value = moment(`${date}T${time}`, 'YYYYMMDDTHH:mm:ss');
  }

  compare = (other: DateTime): number => {
    if (this.value.isBefore(other.value)) {
      return -1;
    }

    if (this.value.isAfter(other.value)) {
      return 1;
    }

    return 0;
  };

  valueOf = (): Moment => this.value;
}

export default DateTime;
