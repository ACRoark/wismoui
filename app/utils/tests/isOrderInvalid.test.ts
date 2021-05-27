import isOrderInvalid from '../isOrderInvalid';

const validOrders = {
  start: 'MI01234567',
  stop: 'MO01234567',
  transfer: 'MT01234567',
  'lowercase start': 'mi01234567',
  'lowercase stop': 'mo01234567',
  'lowercase transfer': 'mt01234567',
};

const validOrderArr = Object.entries(validOrders);

describe('isOrderInvalid', (): void => {
  validOrderArr.forEach((order: string[]): void => {
    const [orderType, orderNumber] = order;

    it(`should return false when mimo ${orderType} order number is valid`, (): void => {
      expect(isOrderInvalid(orderNumber)).toBe(false);
    });
  });

  it('should return true when order number does not end with 8 numbers', (): void => {
    expect(isOrderInvalid('MI1234F567')).toBe(true);
  });

  it('should return true when order number does not start with MI, MO or MT', (): void => {
    expect(isOrderInvalid('MX12345678')).toBe(true);
  });
});
