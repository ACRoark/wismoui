import React from 'react';
import { Redirect } from 'react-router-dom';

import LoadingIndicator from 'components/LoadingIndicator';
import SummaryView from 'components/SummaryView';
import { ISearchState } from 'types';

import EmptyView from './EmptyView';
import ErrorView from './ErrorView';

const selectView = (searchState: ISearchState): React.ReactElement => {
  const { error, loading, results } = searchState;

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorView />;
  }

  if (!results || results.length === 0) {
    return <EmptyView />;
  }

  if (results.length === 1) {
    return <Redirect to={`/orders/${results[0].orderNumber}`} />;
  }

  return <SummaryView results={results} />;
};

export default selectView;
