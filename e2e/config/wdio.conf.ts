import { Config } from 'webdriverio';

import getRuntimeSettings from './getRuntimeSettings';

const settings = getRuntimeSettings();

// eslint-disable-next-line no-console
console.log('Runtime Settings:', settings);

const config: Config = {
  bail: 0,
  baseUrl: settings.baseUrl,
  capabilities: [
    {
      acceptInsecureCerts: true,
      browserName: 'chrome',
      maxInstances: 5,
    },
  ],
  connectionRetryCount: 3,
  connectionRetryTimeout: 120000,
  cucumberOpts: {
    backtrace: false,
    failFast: false,
    ignoreUndefinedDefinitions: false,
    profile: [],
    require: ['./e2e/actions/**/*.ts', './e2e/page-objects/**/*.ts', './e2e/step-definitions/**/*.ts'],
    snippets: true,
    source: true,
    strict: false,
    tagExpression: '',
    timeout: 60000,
  },
  exclude: [],
  framework: 'cucumber',
  logLevel: 'info',
  maxInstances: 10,
  reporters: [['allure', { outputDir: 'allure-results' }]],
  runner: 'local',
  services: [
    [
      'selenium-standalone',
      {
        logs: 'logs',
      },
    ],
  ],
  specs: ['./e2e/features/**/*.feature'],
  waitforTimeout: 10000,

  //
  // =====
  // Hooks
  // =====
  // afterScenario(uri, feature, scenario, result, sourceLocation, context) {
  afterScenario(): void {
    browser.takeScreenshot();
  },
};

export default config;
