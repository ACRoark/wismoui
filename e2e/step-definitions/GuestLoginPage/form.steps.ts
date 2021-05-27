import { Given, When } from 'cucumber';

import { GuestLoginPage } from '../../page-objects';

Given(
  /^I enter "([^"]*)" in the Name input field$/,
  (name: string): Promise<void> => GuestLoginPage.setNameInput(name),
);

When(/^I click the Submit button$/, (): Promise<void> => GuestLoginPage.clickSubmitButton());
