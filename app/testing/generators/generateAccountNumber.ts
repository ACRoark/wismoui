import generateRandomNumber from './generateRandomNumber';

const generateAccountNumber = (): string => generateRandomNumber(100000000000, 999999999999).toString();

export default generateAccountNumber;
