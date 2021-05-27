import React, { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import DteContactNumber from 'components/DteContactNumber';
import IModalConfig from 'types/IModalConfig';

import getServiceOrderEventsModal2 from '../getServiceOrderEventsModal2';

import messages from '../messages';

describe('getServiceOrderEventsModal2', (): void => {
  it('should return modal content when a service order event status is passed to it', (): void => {
    const modalTitle: ReactElement = <FormattedMessage {...messages.DELAYED_title} />;
    const modalContentForServiceOrderEvents: ReactElement = (
      <span className="dte-wismo-view-details-modal-content">
        <FormattedMessage
          {...messages.DELAYED_description}
          values={{
            phoneNumber: <DteContactNumber />,
            website: (
              <a className= "website" href="http://www.doo-dee-doo.com">
                <FormattedMessage {...messages.website} />
              </a>
            ),
          }}
        />
      </span>
    );

    const modalConfigForServiceOrderEvents: IModalConfig = {
      content: modalContentForServiceOrderEvents,
      title: modalTitle,
    };

    expect(getServiceOrderEventsModal2('DELAYED', 'http://www.doo-dee-doo.com')).toStrictEqual(modalConfigForServiceOrderEvents);
  });
});
