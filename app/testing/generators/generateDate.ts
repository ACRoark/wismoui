import faker from 'faker';

const generateFutureDate = (): string => faker.date.future().toISOString();

const generatePastDate = (): string => faker.date.past().toISOString();

export { generateFutureDate, generatePastDate };
