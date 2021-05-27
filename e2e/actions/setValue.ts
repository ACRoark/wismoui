const setValue = async (selector: string, value: string): Promise<void> => {
  // eslint-disable-next-line no-undef
  const input = await $(selector);

  return input.setValue(value);
};

export default setValue;
