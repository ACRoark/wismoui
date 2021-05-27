import generateRandomNumber from './generateRandomNumber';

const generatePremiseId = (): string => generateRandomNumber(1000000000, 9999999999).toString();

export default generatePremiseId;
