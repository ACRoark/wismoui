import createFakeOrder from 'components/createFakeOrder';
import isOrderInactive from '../isOrderInactive';

describe('isOrderInactive', (): void => {
  it('should return false when the order is active', (): void => {
    const order = createFakeOrder('MI23456789');

    expect(isOrderInactive(order)).toBe(false);
  });

  it('should return false when the order is closed due to being canceled but not yet abandoned', (): void => {
    const order = createFakeOrder('MI55555555');

    expect(isOrderInactive(order)).toBe(false);
  });

  it('should return true when the order request has been closed for any reason other than canceled', (): void => {
    const order = createFakeOrder('MI44444444');

    expect(isOrderInactive(order)).toBe(true);
  });
});
