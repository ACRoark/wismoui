import React from 'react';
import { FormattedMessage } from 'react-intl';

import ExclamationPoint from 'images/ExclamationPoint';

import messages from '../messages';
import { IMessage } from '../types';
import './index.less';

interface IErrorBannerProps {
  message: IMessage;
}

const ErrorBanner: React.FC<IErrorBannerProps> = (props: IErrorBannerProps): React.ReactElement => {
  const {
    message: { id },
  } = props;

  return (
    <div className="dte-wismo-error-banner">
      <div>
        <ExclamationPoint className="error-icon" title="error" />
      </div>
      <div className="content">
        <h4>
          <FormattedMessage {...messages[id]} values={{ date: null }} />
        </h4>
      </div>
    </div>
  );
};

export default ErrorBanner;
