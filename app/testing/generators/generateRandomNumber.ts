import faker from 'faker';

const generateRandomNumber = (min: number = 0, max: number = 99999): number => faker.random.number({ min, max });

export default generateRandomNumber;
