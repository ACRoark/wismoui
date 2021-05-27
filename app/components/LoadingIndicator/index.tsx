import React from 'react';
import Loader from 'react-loader-spinner';

import './index.less';

const LoadingIndicator: React.FC = (): React.ReactElement => (
  <div className="dte-wismo-loading-indicator">
    <Loader type="TailSpin" color="#1E3575" height="100" width="100" />
  </div>
);

export default LoadingIndicator;
