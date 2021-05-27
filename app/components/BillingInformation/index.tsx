import React from 'react';

import useConfig from 'hooks/useConfig';
import { userIsAuthenticated } from 'security/utils';

import getBillingMessage from './getBillingMessage';
import './index.less';

interface IBillingInformationProps {
  requestType: string;
}

const BillingInformation: React.FC<IBillingInformationProps> = (
  props: IBillingInformationProps,
): React.ReactElement => {
  const { requestType } = props;

  const isAuthenticated = userIsAuthenticated();
  const { urls } = useConfig();

  const BillingMessage = getBillingMessage(urls, requestType, isAuthenticated);

  return <div className="dte-wismo-billing-information">{BillingMessage}</div>;
};

export default BillingInformation;
