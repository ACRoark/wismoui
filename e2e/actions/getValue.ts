const getValue = async (selector: string): Promise<string> => {
  // eslint-disable-next-line no-undef
  const input = await $(selector);

  return input.getValue();
};

export default getValue;
