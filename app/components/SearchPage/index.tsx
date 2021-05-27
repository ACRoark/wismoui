import React, { FC, ReactElement, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';

import { PageTitles } from 'components/constants';
import useThunkDispatch from 'hooks/useThunkDispatch';
import useTracker from 'hooks/useTracker';
import { userIsAuthenticated } from 'security/utils';
import { resetTracker, sendPageView } from 'store/actions';
import SearchPageForm from './SearchPageForm';

import './index.less';

const SearchPage: FC = (): ReactElement => {
  // Do not let authenticated users access this page
  if (userIsAuthenticated()) {
    return <Redirect to="/" />;
  }

  const dispatch = useThunkDispatch();

  useEffect((): void => {
    dispatch(sendPageView(PageTitles.SEARCH_PAGE));

    dispatch(resetTracker());
  }, []);

  const { error, loading, order } = useTracker();

  // TODO: Handle loading

  if (!error && !loading && order) {
    return <Redirect to={`/orders/${order.orderNumber}`} />;
  }

  return (
    <div className="dte-wismo-search-page">
      <Helmet>
        <title>{PageTitles.SEARCH_PAGE}</title>
      </Helmet>
      <div className="dte-wismo-search-page-container">
        <div className="dte-wismo-search-page-content">
          <SearchPageForm error={error} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
