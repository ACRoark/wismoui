import { ServiceEntry } from 'webdriverio';

const setSeleniumArgs = (config: WebdriverIO.Config, drivers: { [key: string]: string }): void => {
  const seleniumOpts = (config.services?.find(
    (service: ServiceEntry): boolean => Array.isArray(service) && service[0] === 'selenium-standalone',
  ) as [string, WebdriverIO.ServiceOption])[1];

  seleniumOpts.drivers = { ...drivers, ie: false };
};

export default setSeleniumArgs;
