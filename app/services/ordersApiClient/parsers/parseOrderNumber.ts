const parseOrderNumber = (value: string): string => {
  const regex = new RegExp('^M(I|O|T)[0-9]{8}$', 'g');

  if (regex.test(value)) {
    return value;
  }

  throw new Error('Orders must start with MI or MO or MT followed by 8 digits');
};

export default parseOrderNumber;
