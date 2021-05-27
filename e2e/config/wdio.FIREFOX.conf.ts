import { FirefoxOptions } from 'webdriver';
import { Config } from 'webdriverio';

// import setSeleniumArgs from './setSeleniumArgs';
import config from './wdio.conf';

// setSeleniumArgs(config, { firefox: 'latest' });

const browserOptions: FirefoxOptions & { args: string[] } = {
  args: process.argv.includes('--headless') ? ['-headless'] : [],
  prefs: {
    'browser.tabs.remote.autostart': false,
    'startup.homepage_welcome_url.additional': 'about:blank',
    'toolkit.telemetry.reportingpolicy.firstRun': false,
  },
};

const browserConfig: Config = {
  ...config,
  capabilities: [
    {
      browserName: 'firefox',
      'moz:firefoxOptions': browserOptions,
    },
  ],
};

exports.config = browserConfig;
