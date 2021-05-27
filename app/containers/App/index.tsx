import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import ErrorBoundary from 'components/ErrorBoundary';
import GoogleTagManager from 'components/GoogleTagManager';
import Layout from 'components/Layout';
import LoadingIndicator from 'components/LoadingIndicator';
import useThunkDispatch from 'hooks/useThunkDispatch';
import { LanguageProvider } from 'providers/LanguageProvider';
import { ModalProvider } from 'providers/ModalProvider';
import { startupApp } from 'store/actions';
import { IApplicationRootState, IStartupState } from 'types';

import 'antd/dist/antd.less';

const App: React.FC = (): React.ReactElement => {
  const dispatch = useThunkDispatch();
  const startupState: IStartupState = useSelector((state: IApplicationRootState): IStartupState => state.startup);

  useEffect((): void => {
    dispatch(startupApp());
  }, []);

  if (startupState.starting) {
    return <LoadingIndicator />;
  }

  return (
    <GoogleTagManager>
      <LanguageProvider>
        <ErrorBoundary>
          <ModalProvider>
            <Layout />
          </ModalProvider>
        </ErrorBoundary>
      </LanguageProvider>
    </GoogleTagManager>
  );
};

export default App;
