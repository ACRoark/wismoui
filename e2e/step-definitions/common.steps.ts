import { Then } from 'cucumber';

const expectThis = require('expect');

Then(/^the window title is "([^"]*)"$/, (title: string): void => expectThis(browser).toHaveTitle(title));
