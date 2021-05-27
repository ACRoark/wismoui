import React from 'react';
import { FormattedMessage } from 'react-intl';

import DteContactNumber from 'components/DteContactNumber';
import useConfig from 'hooks/useConfig';
import IModalConfig from 'types/IModalConfig';
import { ServiceOrderEventStatus } from 'types/ServiceOrderEventStatus';

import './index.less';
import messages from './messages';

export const getServiceOrderEventsModal = (status: ServiceOrderEventStatus): IModalConfig => {
  const { urls } = useConfig();
  const modalTitle = <FormattedMessage {...messages[`${status}_title`]} />;
  const modalContent = (
    <span className="dte-wismo-view-details-modal-content">
      <FormattedMessage
        {...messages[`${status}_description`]}
        values={{
          phoneNumber: <DteContactNumber />,
          website: (
            <a className="website" href={urls.backToMIMO}>
              <FormattedMessage {...messages.website} />
            </a>
          ),
        }}
      />
    </span>
  );

  return {
    content: modalContent,
    title: modalTitle,
  };
};

export default getServiceOrderEventsModal;
