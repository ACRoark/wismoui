import { Given } from 'cucumber';

Given(/^my preferred language is "([^"]*)"$/, (locale: string): void => {
  // eslint-disable-next-line no-console
  console.log(`TODO: Change browser locale to ${locale}`);
});
