import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';
import ColumnLayout from 'components/ColumnLayout';
import useConfig from 'hooks/useConfig';

import messages from './messages';

import './index.less';

const EmptyView: React.FC = (): React.ReactElement => {
  const { urls } = useConfig();

  const onButtonClick = (): void => {
    window.location.href = urls.backToMIMO;
  };

  return (
    <ColumnLayout>
      <div className="dte-wismo-summary-page-empty-view">
        <div className="banner">
          <FormattedMessage {...messages.empty_message} />
        </div>
        <Button className="button" dataTrackSubAction="no orders go to core" type="primary" onClick={onButtonClick}>
          <FormattedMessage {...messages.backToMimoButtonText} />
        </Button>
      </div>
    </ColumnLayout>
  );
};

export default EmptyView;
