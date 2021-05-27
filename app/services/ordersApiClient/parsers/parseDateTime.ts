import DateTime from 'types/DateTime';

const parseDateTime = (date: string, time: string): DateTime => new DateTime(date, time);

export default parseDateTime;
