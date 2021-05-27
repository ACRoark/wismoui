import React, { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import DateStamp from 'components/DateStamp';
import messages from 'components/ServiceRequestBanner/messages';

import { IMessage } from '../types';
import './index.less';

interface IDefaultBannerProps {
  message: IMessage;
}

const getMessage = (id: string, values: string[] | null): ReactElement => {
  if (values) {
    if (values.length > 1) {
      return (
        <FormattedMessage
          {...messages[id]}
          values={{
            date1: <DateStamp value={values[0]} />,
            date2: <DateStamp value={values[1]} />,
          }}
        />
      );
    }

    return <FormattedMessage {...messages[id]} values={{ date: <DateStamp value={values[0]} /> }} />;
  }

  return <FormattedMessage {...messages[id]} values={{ date: null }} />;
};

const DefaultBanner: React.FC<IDefaultBannerProps> = (props: IDefaultBannerProps): React.ReactElement => {
  const {
    message: { id, values },
  } = props;

  const message = getMessage(id, values);

  return (
    <div className="dte-wismo-default-banner">
      <h4>{message}</h4>
    </div>
  );
};

export default DefaultBanner;
