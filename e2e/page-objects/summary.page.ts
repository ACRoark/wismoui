import { Element } from 'webdriverio';

import { buildUrl, findElement, navigateAsync, waitUntilPageLoads } from '../actions';

import { IPage } from './types';

const relativePath = '/orders';
const url = buildUrl(relativePath);

interface ISummaryPage extends IPage {
  getBanner: () => Promise<Element>;
  open: () => Promise<void>;
}

const SummaryPage: ISummaryPage = {
  url,
  getBanner: (): Promise<Element> => findElement('.banner'),
  open: (): Promise<void> => navigateAsync(relativePath),
  waitUntilPageLoads: (): Promise<boolean> => waitUntilPageLoads(url),
};

export default SummaryPage;
