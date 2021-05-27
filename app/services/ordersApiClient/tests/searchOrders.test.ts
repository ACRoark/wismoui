import createFakeOrder from 'components/createFakeOrder';
import { httpClient, IHttpResponse} from 'services/httpClient';

import searchOrdersAsync from '../searchOrdersAsync';

jest.mock('services/httpClient');

const mockHttpClient = httpClient as jest.Mocked<typeof httpClient>;
const url = 'http://www.foo.com';

describe('searchOrdersAsync', (): void => {
  it('should return what comes back from the API when the call is successful', async (): Promise<void> => {
    const fakeOrder = createFakeOrder('MI12345678');

    mockHttpClient.get.mockReturnValue(Promise.resolve<IHttpResponse>({
      data: fakeOrder,
      status: 200,
      statusText: 'OK',
    }));

    expect(searchOrdersAsync(url)).resolves.toBe(fakeOrder);
  });

  it('should throw an error when an error occurs in the API call', async (): Promise<void> => {
    const reason = 'whatever';

    mockHttpClient.get.mockReturnValue(Promise.reject(reason));

    expect(searchOrdersAsync(url)).rejects.toBe(reason);
  });
});
