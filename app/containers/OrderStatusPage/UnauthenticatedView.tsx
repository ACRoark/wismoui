import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import useTracker from 'hooks/useTracker';

import selectView from './selectView';

// This view should only be reached by an unauthenticated user from the Guest Tracker Login Page
// The order should be found in the current state

const UnauthenticatedView: React.FC = (): React.ReactElement => {
  const { search = '' } = useLocation();
  const view = selectView(useTracker());

  if (!view) {
    return <Redirect to={`/search${search}`} />;
  }

  return view;
};

export default UnauthenticatedView;
