import getEncodedName from '../getEncodedName';

describe('getEncodedName', (): void => {
  it('should properly encode special characters', (): void => {
    expect(getEncodedName(`Test123 -_.!~*'();,/?:@&=+$#`)).toBe('Test123%20%2D%5F%2E%21%7E%2A%27%28%29%3B%2C%2F%3F%3A%40%26%3D%2B%24%23');
  });
});
