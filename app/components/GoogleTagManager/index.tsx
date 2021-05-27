import React from 'react';

import useConfig from 'hooks/useConfig';
import googleTagManager from 'services/googleTagManager';

interface IGoogleTagManagerProps {
  children?: React.ReactNode;
}
const GoogleTagManager: React.FC<IGoogleTagManagerProps> = (props: IGoogleTagManagerProps): React.ReactElement => {
  const { children } = props;

  const { loading, googleTagManagerConfig } = useConfig();

  // Using the loading flag prevents us from initializing the tag manager twice
  // (which inserts script into the HTML twice!)
  if (!loading && googleTagManagerConfig) {
    googleTagManager.initialize(googleTagManagerConfig);
  }

  return <>{React.Children.only(children)}</>;
};

export default GoogleTagManager;
