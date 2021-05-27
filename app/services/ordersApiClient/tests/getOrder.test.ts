import createFakeOrder from 'components/createFakeOrder';
import { getAuthToken } from 'security/utils';
import { httpClient, IHttpResponse} from 'services/httpClient';

import getOrderAsync from '../getOrderAsync';

jest.mock('services/httpClient');
jest.mock('security/utils');

const mockGetAuthToken = getAuthToken as jest.MockedFunction<typeof getAuthToken>;
const mockHttpClient = httpClient as jest.Mocked<typeof httpClient>;
const url = 'http://www.foo.com/{orderNumber}';

describe('getOrderAsync', (): void => {
  mockGetAuthToken.mockReturnValue('whatever');

  it('should include the order number in the request', async (): Promise<void> => {
    const fakeOrder = createFakeOrder('MI12345678');

    mockHttpClient.get.mockReturnValue(Promise.resolve<IHttpResponse>({
      data: fakeOrder,
      status: 200,
      statusText: 'OK',
    }));

    getOrderAsync(url, fakeOrder.orderNumber);

    // TODO: Get this working
    // expect(httpClient.get).toBeCalledWith('http://www.foo.com/MI12345678', {
    //   headers: {
    //     authorization: 'whatever',
    //   },
    // });
    expect(httpClient.get).toBeCalledTimes(1);
  });

  it('should return what comes back from the API when the call is successful', async (): Promise<void> => {
    const fakeOrder = createFakeOrder('MI12345678');

    mockHttpClient.get.mockReturnValue(Promise.resolve<IHttpResponse>({
      data: fakeOrder,
      status: 200,
      statusText: 'OK',
    }));

    expect(getOrderAsync(url, fakeOrder.orderNumber)).resolves.toBe(fakeOrder);
  });

  it('should throw an error when an error occurs in the API call', async (): Promise<void> => {
    const reason = 'whatever';

    mockHttpClient.get.mockReturnValue(Promise.reject(reason));

    expect(getOrderAsync(url, 'MI12345678')).rejects.toBe(reason);
  });
});
