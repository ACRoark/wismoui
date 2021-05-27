import Timeline from 'antd/lib/timeline';
import * as _ from 'lodash';
import React, { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import DateStamp from 'components/DateStamp';
import IVerificationEvent from 'types/IVerificationEvent';
import IVerificationEventStatusUpdate from 'types/IVerificationEventStatusUpdate';

import filterVerificationHistory from './filterVerificationHistory';
import messages from './messages';

import '../index.less';

interface IVerificationHistoryProps {
  verificationEvents: IVerificationEvent[];
}

const VerificationHistory: React.FC<IVerificationHistoryProps> = (
  props: IVerificationHistoryProps,
): React.ReactElement => {
  const { verificationEvents } = props;
  const { verificationEventStatusUpdates } = _.last(verificationEvents);

  const history = filterVerificationHistory(verificationEventStatusUpdates);

  if (history.length) {
    return (
      <Timeline className="dte-wismo-timeline">
        {history.map(
          (update: IVerificationEventStatusUpdate): ReactElement => (
            <Timeline.Item
              color="gray"
              key={`${update.verificationCode}_${update.createdAtDate}_${update.createdAtTime}`}
            >
              <FormattedMessage
                {...messages[`${update.verificationCode}`]}
                values={{ date: <DateStamp value={update.createdAtDate} /> }}
              />
            </Timeline.Item>
          ),
        )}
      </Timeline>
    );
  }

  return <></>;
};

export default VerificationHistory;
