import { ChromeOptions } from 'webdriver';
import { Config } from 'webdriverio';

import CHROME_ARGS from './chromeArgs';
// import setSeleniumArgs from './setSeleniumArgs';
import config from './wdio.conf';

// setSeleniumArgs(config, { chrome: '85.0.4183.87' });

const browserOptions: ChromeOptions & { args: string[] } = {
  args: [
    ...CHROME_ARGS,
    ...(process.argv.includes('--headless') ? ['--headless', '--no-sandbox'] : []),
    '--window-size=1920,1080',
  ],
};

const browserConfig: Config = {
  ...config,
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': browserOptions,
    },
  ],
};

exports.config = browserConfig;
