import { Then, When } from 'cucumber';

import { App, GuestLoginPage, SummaryPage, UnifiedLoginPage } from '../page-objects';

const expectThis = require('expect');

When(/^I browse to the Order Tracker app$/, (): Promise<void> => App.open());

When(
  /^I browse to the "([^"]*)" page$/,
  (page: string): Promise<void> => {
    switch (page) {
      case 'Guest Login':
        return GuestLoginPage.open();
      // case 'Status':
      //   return OrderStatusPage.open();
      case 'Summary':
        return SummaryPage.open();
      case 'Unified Login':
        return UnifiedLoginPage.open();
      default:
        throw new Error(`Unable to open page "${page}". Not implemented.`);
    }
  },
);

Then(/^I am routed to the "([^"]*)" page$/, (page: string): void => {
  switch (page) {
    case 'Guest Login':
      // eslint-disable-next-line no-undef
      GuestLoginPage.waitUntilPageLoads().then((): void => expectThis(browser).toHaveUrl(GuestLoginPage.url));
      break;
    // case 'Status':
    //   OrderStatusPage.waitUntilPageLoads().then((): void => expectThis(browser).toHaveUrl(OrderStatusPage.url);
    //   break;
    case 'Summary':
      // eslint-disable-next-line no-undef
      SummaryPage.waitUntilPageLoads().then((): void => expectThis(browser).toHaveUrl(SummaryPage.url));
      break;
    default:
      throw new Error(`Unable to open page "${page}". Not implemented.`);
  }
});
