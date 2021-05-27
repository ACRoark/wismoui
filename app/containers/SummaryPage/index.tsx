import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { PageTitles } from 'components/constants';
import useFlags from 'hooks/useFlags';
import useSearch from 'hooks/useSearch';
import useThunkDispatch from 'hooks/useThunkDispatch';
import { searchOrders, sendPageView } from 'store/actions';

import selectView from './selectView';

const SummaryPage: React.FC = (): React.ReactElement => {
  const dispatch = useThunkDispatch();
  const { bug2263 } = useFlags();

  const searchState = useSearch();

  // Run this once when the container/page first loads
  useEffect((): void => {
    dispatch(sendPageView(PageTitles.SUMMARY_PAGE));

    if (!searchState.results) {
      if (bug2263) {
        dispatch(searchOrders(bug2263));
      } else {
        dispatch(searchOrders());
      }
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{PageTitles.SUMMARY_PAGE}</title>
      </Helmet>
      {selectView(searchState)}
    </>
  );
};

export default SummaryPage;
