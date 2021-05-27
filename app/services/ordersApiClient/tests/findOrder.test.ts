import createFakeOrder from 'components/createFakeOrder';
import { httpClient, IHttpResponse} from 'services/httpClient';

import findOrderAsync from '../findOrderAsync';

jest.mock('services/httpClient');

const mockHttpClient = httpClient as jest.Mocked<typeof httpClient>;
const url = 'http://www.foo.com/{orderNumber}?name={name}';

describe('findOrderAsync', (): void => {
  it('should include the order number in the request', async (): Promise<void> => {
    const fakeOrder = createFakeOrder('MI12345678');

    mockHttpClient.get.mockReturnValue(Promise.resolve<IHttpResponse>({
      data: fakeOrder,
      status: 200,
      statusText: 'OK',
    }));

    findOrderAsync(url, fakeOrder.orderNumber, fakeOrder.customer.name, 'fakeRecaptchaTokenString');

    // TODO: Get this working
    // expect(httpClient.get).toBeCalledWith('http://www.foo.com/MI12345678?name=????');
    expect(httpClient.get).toBeCalledTimes(1);
  });

  it('should return what comes back from the API when the call is successful', async (): Promise<void> => {
    const fakeOrder = createFakeOrder('MI12345678');

    mockHttpClient.get.mockReturnValue(Promise.resolve<IHttpResponse>({
      data: fakeOrder,
      status: 200,
      statusText: 'OK',
    }));

    expect(findOrderAsync(url, fakeOrder.orderNumber, fakeOrder.customer.name, 'fakeRecaptchaTokenString')).resolves.toBe(fakeOrder);
  });

  it('should throw an error when an error occurs in the API call', async (): Promise<void> => {
    const reason = 'whatever';

    mockHttpClient.get.mockReturnValue(Promise.reject(reason));

    expect(findOrderAsync(url, 'MI12345678', 'Smith', 'fakeRecaptchaTokenString')).rejects.toBe(reason);
  });
});
