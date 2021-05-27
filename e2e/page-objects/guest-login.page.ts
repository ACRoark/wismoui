import { buildUrl, click, navigateAsync, setValue, waitUntilPageLoads } from '../actions';

import { IPage } from './types';

const relativePath = '/search';
const url = buildUrl(relativePath);

interface IGuestLoginPage extends IPage {
  clickSubmitButton: () => Promise<void>;
  open: () => Promise<void>;
  setNameInput: (value: string) => Promise<void>;
  setOrderNumberInput: (value: string) => Promise<void>;
}

const GuestLoginPage: IGuestLoginPage = {
  url,
  clickSubmitButton: (): Promise<void> => click('.button'),
  open: (): Promise<void> => navigateAsync(relativePath),
  setNameInput: (value: string): Promise<void> => setValue('[name="name"]', value),
  setOrderNumberInput: (value: string): Promise<void> => setValue('[name="order-number"]', value),
  waitUntilPageLoads: (): Promise<boolean> => waitUntilPageLoads(url),
};

export default GuestLoginPage;
