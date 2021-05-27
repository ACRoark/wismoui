import { Element } from 'webdriverio';

import { click, setValue, waitUntilPageLoads } from '../actions';

import { IPage } from './types';

const url = 'https://newlook.dteenergy.com/wps/wcm/connect/dte-web/login';

interface IUnifiedLoginPage extends IPage {
  clickSignInButton: () => Promise<void>;
  clickTrackOrderButton: () => Promise<void>;
  open: () => Promise<void>;
  setPasswordInput: (value: string) => Promise<void>;
  setUserNameInput: (value: string) => Promise<void>;
}

const UnifiedLoginPage: IUnifiedLoginPage = {
  url,
  clickSignInButton: (): Promise<void> => click('#signinAndReloadUnified'),
  clickTrackOrderButton: (): Promise<void> => click('#trackOrder'),
  // eslint-disable-next-line no-undef
  open: (): Promise<void> => browser.url(url),
  setPasswordInput: (value: string): Promise<void> => setValue('#input-Password', value),
  setUserNameInput: (value: string): Promise<void> => setValue('#input-Email', value),
  waitUntilPageLoads: (): Promise<boolean> => waitUntilPageLoads(url),
};

export default UnifiedLoginPage;
