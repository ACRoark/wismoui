import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFoundPage from 'components/NotFoundPage';
import ProtectedRoute from 'components/ProtectedRoute';
import SearchPage from 'components/SearchPage';
import TestPage from 'components/TestPage';

// TODO: Add lazy-loading for Page components
import Home from 'containers/HomePage';
import OrderStatusPage from 'containers/OrderStatusPage';
import SummaryPage from 'containers/SummaryPage';

const Routes: React.FC<{}> = (): React.ReactElement => (
  <Switch>
    <Route exact path="/" component={Home} />
    <ProtectedRoute exact path="/orders" component={SummaryPage} />
    <Route exact path="/orders/:orderNumber" component={OrderStatusPage} />
    <Route exact path="/search" component={SearchPage} />
    <Route exact path="/testpage" component={TestPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Routes;
