import generateRandomNumber from './generateRandomNumber';

const generateBpId = (): string => `bp${generateRandomNumber(3, 5)}`;

export default generateBpId;
