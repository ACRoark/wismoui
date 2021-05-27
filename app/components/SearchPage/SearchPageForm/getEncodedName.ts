const getEncodedName = (name: string): string =>
  encodeURIComponent(name).replace(
    /[-_.!~*'()]/g,
    (character: string): string => `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
  );

export default getEncodedName;
