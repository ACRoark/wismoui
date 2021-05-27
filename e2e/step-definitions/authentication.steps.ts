import { Given } from 'cucumber';

import { UnifiedLoginPage } from '../page-objects';

Given(/^I am an unauthenticated user$/, (): void => {
  // eslint-disable-next-line no-console
  console.log('TODO: Logout user to ensure they are unauthenticated');
});

Given(
  /^I login as "([^"]*)" with "([^"]*)"$/,
  async (username: string, password: string): Promise<void> => {
    await UnifiedLoginPage.open();
    await UnifiedLoginPage.setUserNameInput(username);
    await UnifiedLoginPage.setPasswordInput(password);

    await UnifiedLoginPage.clickSignInButton();
  },
);
