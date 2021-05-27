import React from 'react';
import { Redirect } from 'react-router-dom';

import createFakeSearchResult from 'components/createFakeSearchResult';
import LoadingIndicator from 'components/LoadingIndicator';
import SummaryView from 'components/SummaryView';
import { ISearchState } from 'types';

import EmptyView from '../EmptyView';
import ErrorView from '../ErrorView';
import selectView from '../selectView';

describe('selectView', (): void => {
  it('should not log errors in console when rendered', (): void => {
    const spy = jest.spyOn(global.console, 'error');

    const state: ISearchState = {
      loading: false,
    };

    selectView(state);

    expect(spy).not.toHaveBeenCalled();
  });

  it (`should redirect to the status page when only one order is found`, (): void => {
    const orderNumber = 'MI12345678';

    const state: ISearchState = {
      loading: false,
      results: [createFakeSearchResult(orderNumber)],
    };

    const view = selectView(state);

    expect(view).toStrictEqual(<Redirect to={`/orders/${orderNumber}`} />);
  });

  it (`should return the empty view when no orders are found`, (): void => {
    const state: ISearchState = {
      loading: false,
      results: [],
    };

    const view = selectView(state);

    expect(view).toStrictEqual(<EmptyView />);
  });

  it (`should return the error view when an error occurs while retrieving the orders`, (): void => {
    const error = 'whatever';

    const state: ISearchState = {
      error,
      loading: false,
    };

    const view = selectView(state);

    expect(view).toStrictEqual(<ErrorView />);
  });

  it (`should return the loading indicator when the orders are being loaded`, (): void => {
    const state: ISearchState = {
      loading: true,
    };

    const view = selectView(state);

    expect(view).toStrictEqual(<LoadingIndicator />);
  });

  it (`should return the summary view when multiple orders are found`, (): void => {
    const results = [
      createFakeSearchResult('MI12345678'),
      createFakeSearchResult('MO12345678'),
    ];

    const state: ISearchState = {
      loading: false,
      results,
    };

    const view = selectView(state);

    expect(view).toStrictEqual(<SummaryView results={results} />);
  });
});
