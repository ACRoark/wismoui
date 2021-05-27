import { MicrosoftEdgeOptions } from 'webdriver';
import { Config } from 'webdriverio';

import CHROME_ARGS from './chromeArgs';
// import setSeleniumArgs from './setSeleniumArgs';
import config from './wdio.conf';

// setSeleniumArgs(config, { chromiumedge: 'latest' });

const browserOptions: MicrosoftEdgeOptions & { args: string[] } = {
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
      browserName: 'MicrosoftEdge',
      'ms:edgeOptions': browserOptions,
    },
  ],
};

exports.config = browserConfig;
