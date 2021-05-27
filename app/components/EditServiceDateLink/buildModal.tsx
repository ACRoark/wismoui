import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';
import IModalConfig from 'types/IModalConfig';

import './index.less';
import messages from './messages';

const buildModal = (onCancel: () => void, onContinue: () => void): IModalConfig => ({
  content: (
    <div className="content-edit-date">
      <FormattedMessage {...messages.promptMessage} />
    </div>
  ),
  footer: (
    <div className="modal-buttons">
      <Button
        className="secondary-button-edit-date dte-wismo-edit-service-date-link-button"
        type="secondary"
        onClick={onCancel}
      >
        <FormattedMessage {...messages.cancelButtonText} />
      </Button>
      <Button className="dte-wismo-edit-service-date-link-button" type="primary" onClick={onContinue}>
        <FormattedMessage {...messages.continueButtonText} />
      </Button>
    </div>
  ),
  title: <FormattedMessage {...messages.promptTitle} />,
});

export default buildModal;
