import * as React from 'react';

import Content from 'components/Content';
import ErrorBoundary from 'components/ErrorBoundary';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Routes from 'components/Routes';
import Toolbar from 'components/Toolbar';

const Layout: React.FC = (): React.ReactElement => (
  <>
    <Header />
    <Content>
      <ErrorBoundary>
        <Toolbar />
        <Routes />
      </ErrorBoundary>
    </Content>
    <Footer />
  </>
);

export default Layout;
