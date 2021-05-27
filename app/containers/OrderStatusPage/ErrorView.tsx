import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';
import ColumnLayout from 'components/ColumnLayout';
import useConfig from 'hooks/useConfig';
import ExclamationPoint from 'images/ExclamationPoint';

import messages from './messages';

import './index.less';

interface IErrorViewProps {
  reason: string;
}

const ErrorView: React.FC<IErrorViewProps> = (props: IErrorViewProps): React.ReactElement => {
  const { reason } = props;

  const { urls } = useConfig();

  const onButtonClick = (): void => {
    window.location.href = urls.backToMIMO;
  };

  return (
    <ColumnLayout>
      <div className="dte-wismo-order-status-page-error-view">
        <div className="banner">
          <div>
            <ExclamationPoint className="error-icon" title="error" />
          </div>
          <div className="error-message">{reason}</div>
        </div>
        <Button className="button" dataTrackSubAction="no orders go to core" type="primary" onClick={onButtonClick}>
          <FormattedMessage {...messages.backToMimoButtonText} />
        </Button>
      </div>
    </ColumnLayout>
  );
};

export default ErrorView;
