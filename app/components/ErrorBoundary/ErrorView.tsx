import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';
import ColumnLayout from 'components/ColumnLayout';
import useConfig from 'hooks/useConfig';
import ExclamationPoint from 'images/ExclamationPoint';

import messages from './messages';

import './index.less';

interface IErrorViewProps {
  errorInfo: Error | null;
}

const ErrorView: React.FC<IErrorViewProps> = (props: IErrorViewProps): React.ReactElement => {
  const { errorInfo } = props;
  const { urls } = useConfig();

  const onButtonClick = (): void => {
    window.location.href = urls.backToMIMO;
  };

  return (
    <ColumnLayout>
      <div className="dte-wismo-error-boundary-error-view">
        <div className="banner">
          <div>
            <ExclamationPoint className="error-icon" title="error" />
          </div>
          <div className="error-message">
            <FormattedMessage {...messages.errorMessage} />
            {process.env.NODE_ENV !== 'production' && <div className="error-details">{errorInfo?.message}</div>}
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
