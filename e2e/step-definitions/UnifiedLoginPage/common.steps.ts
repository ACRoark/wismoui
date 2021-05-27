import { Then } from 'cucumber';
import { Element } from 'webdriverio';

import { SummaryPage } from '../../page-objects';

const expectThis = require('expect');

Then(/^I see the banner message "([^"]*)"$/, (message: string): void => {
  SummaryPage.getBanner().then((element: Element): void => {
    expectThis(element).toHaveText(message);
  });
});
