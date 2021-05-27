const parsePhoneNumber = (value: string): string => {
  const regex = new RegExp('^[0-9]{7}([0-9]{3})?$', 'g');

  if (regex.test(value)) {
    return value;
  }

  throw new Error('Phone numbers must be 7 or 10 numeric digits.');
};

export default parsePhoneNumber;
