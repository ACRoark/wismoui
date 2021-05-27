import React from 'react';

import SelectLanguage from 'components/SelectLanguage';
import useAuthState from 'hooks/useAuth';
import useFlags from 'hooks/useFlags';

import './index.less';

const renderLanguageSelector = (): React.ReactElement => (
  <span key="language" style={{ margin: '0px 25px' }}>
    <SelectLanguage />
  </span>
);

const renderLoginButton = (): React.ReactElement => {
  const onClick = (): void => {
    window.location.href = '/login.html';
  };

  return (
    <button key="login" type="button" onClick={onClick}>
      Login
    </button>
  );
};

const renderLogoutButton = (): React.ReactElement => {
  const onClick = (): void => {
    window.location.href = '/logout.html';
  };

  return (
    <button key="logout" type="button" onClick={onClick}>
      Logout
    </button>
  );
};

const renderItems = (canChangeLanguage: boolean, isAuthenticated: boolean): React.ReactElement[] => {
  const items: React.ReactElement[] = [];

  if (isAuthenticated) {
    items.push(renderLogoutButton());
  } else {
    items.push(renderLoginButton());
  }

  if (canChangeLanguage) {
    items.push(renderLanguageSelector());
  }

  return items;
};

const Toolbar: React.FC = (): React.ReactElement => {
  const { canChangeLanguage, developerMode } = useFlags();

  const { isAuthenticated, loading } = useAuthState();

  if (loading || !developerMode) {
    return <></>;
  }

  return <div className="dte-wismo-toolbar">{renderItems(canChangeLanguage, isAuthenticated)}</div>;
};

export default Toolbar;
