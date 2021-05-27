import React from 'react';
import { Redirect } from 'react-router-dom';

const selectView = (queryParameter: string, userIsAuthenticated: boolean): React.ReactElement => {
  const pathname = userIsAuthenticated ? '/orders' : `/search${queryParameter}`;

  return <Redirect to={pathname} />;
};

export default selectView;
