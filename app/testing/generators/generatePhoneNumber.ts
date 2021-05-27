// import faker from 'faker';

import generateRandomNumber from './generateRandomNumber';

const generatePhoneNumber = (): string => generateRandomNumber(1000000000, 9999999999).toString(); // Should be: faker.phoneNumber();

export default generatePhoneNumber;
