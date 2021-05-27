const click = async (selector: string): Promise<void> => {
  // eslint-disable-next-line no-undef
  const element = await $(selector);

  return element.click();
};

export default click;
