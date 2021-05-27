import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { PageTitles } from 'components/constants';
import useThunkDispatch from 'hooks/useThunkDispatch';
import { userIsAuthenticated } from 'security/utils';
import { sendPageView } from 'store/actions';

import AuthenticatedView from './AuthenticatedView';
import UnauthenticatedView from './UnauthenticatedView';

const OrderStatusPage: React.FC = (): React.ReactElement => {
  const dispatch = useThunkDispatch();

  useEffect((): void => {
    dispatch(sendPageView(PageTitles.ORDER_STATUS_PAGE));
  }, []);

  return (
    <>
      <Helmet>
        <title>{PageTitles.ORDER_STATUS_PAGE}</title>
      </Helmet>
      {userIsAuthenticated() ? <AuthenticatedView /> : <UnauthenticatedView />}
    </>
  );
};

export default OrderStatusPage;
