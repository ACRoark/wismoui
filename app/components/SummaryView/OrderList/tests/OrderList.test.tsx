import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { SUPPORTED_LOCALES } from 'locales';
import generate from 'testing/generators';
import { createSnapshotWithIntl, renderWithIntl } from 'testing/utils';
import { IOrderSearchResult } from 'types';

import OrdersList from '../OrderList';
import selectListItem from '../selectListItem';

jest.mock('../selectListItem');

const mockSelectListItem = selectListItem as jest.MockedFunction<typeof selectListItem>;

const emptyList: IOrderSearchResult[] = [];
const oneItemList: IOrderSearchResult[] = generate.orderSearchResults(1, 1);
const twoItemList: IOrderSearchResult[] = generate.orderSearchResults(2, 2);

const expectNoConsoleErrors = (language: string, orders: IOrderSearchResult[]): void => {
  const spy = jest.spyOn(global.console, 'error');

  renderWithIntl(<Router><OrdersList orders={orders} /></Router>, language);

  expect(spy).not.toHaveBeenCalled();
};

const expectComponentToMatchSnapshot = (language: string, orders: IOrderSearchResult[]): void => {
  const tree = createSnapshotWithIntl(<Router><OrdersList orders={orders} /></Router>, language);

  expect(tree).toMatchSnapshot();
};

describe('<OrdersList />', (): void => {
  beforeEach((): void => {
    mockSelectListItem.mockReturnValue(<div>Dummy Item</div>);
  });

  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    it(`should not log errors in console when rendered with an empty list and the current language is ${language}`, (): void =>
      expectNoConsoleErrors(language, emptyList));

    it(`should not log errors in console when rendered with a single item and the current language is ${language}`, (): void =>
      expectNoConsoleErrors(language, oneItemList));

    it(`should not log errors in console when rendered with multiple items and the current language is ${language}`, (): void =>
      expectNoConsoleErrors(language, twoItemList));

    it(`should render correctly when an empty list is passed and the current language is ${language}`, (): void =>
      expectComponentToMatchSnapshot(language, emptyList));

    it(`should render correctly when a single item is passed and the current language is ${language}`, (): void =>
      expectComponentToMatchSnapshot(language, oneItemList));

    it(`should render correctly when multiple items are passed and the current language is ${language}`, (): void =>
      expectComponentToMatchSnapshot(language, twoItemList));
  });
});
