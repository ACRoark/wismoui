const formatAccountNumber = (value: string): string => {
  const regex = new RegExp('^[0-9]{12}$', 'g');

  if (!regex.test(value)) {
    throw new Error('Account numbers must be 12 numeric digits.');
  }

  const formattedValue = `${value.substr(0, 4)} ${value.substr(4, 3)} ${value.substr(7, 4)} ${value.substr(11, 1)}`;

  return formattedValue;
};

export default formatAccountNumber;
