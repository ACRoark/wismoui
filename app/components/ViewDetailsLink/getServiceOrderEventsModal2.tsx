import React from 'react';
import { FormattedMessage } from 'react-intl';

import DteContactNumber from 'components/DteContactNumber';
import IModalConfig from 'types/IModalConfig';
import { ServiceOrderEventStatus } from 'types/ServiceOrderEventStatus';

import './index.less';
import messages from './messages';

const getServiceOrderEventsModal2 = (status: ServiceOrderEventStatus, url: string): IModalConfig => {
  const modalTitle = <FormattedMessage {...messages[`${status}_title`]} />;
  const modalContent = (
    <span className="dte-wismo-view-details-modal-content">
      <FormattedMessage
        {...messages[`${status}_description`]}
        values={{
          phoneNumber: <DteContactNumber />,
          website: (
            <a className="website" href={url}>
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

export default getServiceOrderEventsModal2;
