import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useThunkDispatch from 'hooks/useThunkDispatch';
import useTracker from 'hooks/useTracker';
import { getOrder } from 'store/actions';

import ErrorView from './ErrorView';
import NotFoundView from './NotFoundView';
import selectView from './selectView';

// This view should only be reached by an authenticated user from the newlook website
// Or the unlikely case the user is current authenticated and clicks a link from an email, SMS message or bookmark while the session is still alive
// The order should be retrieved from the API
const AuthenticatedView: React.FC = (): React.ReactElement => {
  const dispatch = useThunkDispatch();
  const { orderNumber } = useParams();

  if (!orderNumber) {
    return <ErrorView reason="You must specify an order number" />;
  }

  useEffect((): void => {
    dispatch(getOrder(orderNumber));
  }, []);

  const view = selectView(useTracker());

  if (!view) {
    return <NotFoundView />;
  }

  return view;
};

export default AuthenticatedView;
