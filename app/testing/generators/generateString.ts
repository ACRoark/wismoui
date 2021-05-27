import faker from 'faker';

import generateRandomNumber from './generateRandomNumber';

const generateAlphanumericString = (length: number = 1): string => faker.random.alphaNumeric(length);

const generateNumericString = (length: number = 1): string => {
  const max = 10 ** length - 1;
  const min = 10 ** (length - 1);

  return generateRandomNumber(min, max).toString();
};

const letters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

const generateString = (length: number = 1, upperCase: boolean = false): string => {
  // Should just be this but it isn't resolving to a function
  // faker.random.alpha({ count: length, upcase: upperCase });
  let s = '';

  for (let i = 0; i < length; i++) {
    s += letters[generateRandomNumber(0, 25)];
  }

  return upperCase ? s.toUpperCase() : s;
};

export { generateAlphanumericString, generateNumericString, generateString };
