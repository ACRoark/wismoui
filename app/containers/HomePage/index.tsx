import React from 'react';
import { useLocation } from 'react-router-dom';

import { userIsAuthenticated } from 'security/utils';

import selectView from './selectView';

const HomePage: React.FC = (): React.ReactElement => {
  const { search: queryParameter = '' } = useLocation();

  return selectView(queryParameter, userIsAuthenticated());
};

export default HomePage;
