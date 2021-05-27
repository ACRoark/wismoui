import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import Address from 'components/Address';
import DateStamp from 'components/DateStamp';
import ErrorIcon from 'components/Icons/ErrorIcon';
import IAddress from 'types/IAddress';

import messages from './messages';

import './index.less';

interface CancelledStepProps {
  address: IAddress;
  cancelDate: string;
  requestType: string;
}

const CancelledStep = (props: CancelledStepProps): React.ReactElement => {
  const { address, cancelDate, requestType } = props;

  return (
    <div className="dte-wismo-cancelled-step">
      <div className="dte-wismo-cancelled-step-icon-wrapper">
        <ErrorIcon />
      </div>
      <h4>
        <span className="dte-wismo-cancelled-step-message">
          <FormattedMessage
            {...messages[requestType]}
            values={{
              address: <Address address={address} format="street" />,
              date: <DateStamp value={cancelDate} />,
            }}
          />
        </span>
      </h4>
    </div>
  );
};

export default CancelledStep;
