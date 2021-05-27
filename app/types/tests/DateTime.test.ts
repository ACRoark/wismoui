import DateTime from 'types/DateTime';

describe('DateTime', (): void => {
  describe('compare(...)', (): void => {
    it('should return -1 when the other date is after the current one', (): void => {
      const currentValue = new DateTime('20200616', '13:05:15');
      const otherValue = new DateTime('20200617', '13:05:15');

      const result = currentValue.compare(otherValue);

      expect(result).toBe(-1);
    });

    it('should return -1 when the other date is the same but the other time is after the current one', (): void => {
      const currentValue = new DateTime('20200616', '13:05:15');
      const otherValue = new DateTime('20200617', '14:05:15');

      const result = currentValue.compare(otherValue);

      expect(result).toBe(-1);
    });

    it('should return 0 when the dates (and times) are the same', (): void => {
      const currentValue = new DateTime('20200616', '13:05:15');
      const otherValue = new DateTime('20200616', '13:05:15');

      const result = currentValue.compare(otherValue);

      expect(result).toBe(0);
    });

    it('should return 1 when the other date is before the current one', (): void => {
      const currentValue = new DateTime('20200616', '13:05:15');
      const otherValue = new DateTime('20200615', '13:05:15');

      const result = currentValue.compare(otherValue);

      expect(result).toBe(1);
    });

    it('should return 1 when the other date is the same but the other time is before the current one', (): void => {
      const currentValue = new DateTime('20200616', '13:05:15');
      const otherValue = new DateTime('20200615', '12:05:15');

      const result = currentValue.compare(otherValue);

      expect(result).toBe(1);
    });

    it('should throw an error when the date parameter is an empty string', (): void =>
      expect((): DateTime => new DateTime('', '13:05:15')).toThrowError());

    it('should throw an error when the time parameter is an empty string', (): void =>
      expect((): DateTime => new DateTime('20200616', '')).toThrowError());
  });
});
