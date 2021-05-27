import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';
import ColumnLayout from 'components/ColumnLayout';
import useConfig from 'hooks/useConfig';
import ExclamationPoint from 'images/ExclamationPoint';

import messages from './messages';

import './index.less';

const ErrorView: React.FC = (): React.ReactElement => {
  const { urls } = useConfig();

  const onButtonClick = (): void => {
    window.location.href = urls.backToMIMO;
  };

  return (
    <ColumnLayout>
      <div className="dte-wismo-summary-page-error-view">
        <div className="banner">
          <div>
            <ExclamationPoint className="error-icon" title="error" />
          </div>
          <div className="error-message">
            <FormattedMessage {...messages.system_unavailable_message} />
          </div>
        </div>
        <Button className="button" dataTrackSubAction="no orders go to core" type="primary" onClick={onButtonClick}>
          <FormattedMessage {...messages.backToMimoButtonText} />
        </Button>
      </div>
    </ColumnLayout>
  );
};

export default ErrorView;
