import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import Address from 'components/Address';
import DateStamp from 'components/DateStamp';
import CompletedIcon from 'components/Icons/CompletedIcon';
import IAddress from 'types/IAddress';

import messages from './messages';

import './index.less';

interface CompletedStepProps {
  address: IAddress;
  completeDate: string;
  requestType: string;
}

const CompletedStep = (props: CompletedStepProps): React.ReactElement => {
  const { address, completeDate, requestType } = props;

  return (
    <div className="dte-wismo-completed-step">
      <div className="dte-wismo-completed-step-icon-wrapper">
        <CompletedIcon />
      </div>
      <h4>
        <span className="dte-wismo-completed-step-message">
          <FormattedMessage
            {...messages[requestType]}
            values={{
              address: <Address address={address} format="street" />,
              date: <DateStamp value={completeDate} />,
            }}
          />
        </span>
      </h4>
    </div>
  );
};

export default CompletedStep;
