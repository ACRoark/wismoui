import * as React from 'react';

import formatAccountNumber from './formatAccountNumber';

interface IAccountNumberProps {
  value: string;
}

const AccountNumber: React.FC<IAccountNumberProps> = (props: IAccountNumberProps): React.ReactElement => {
  const { value } = props;

  const formattedAccountNumber = formatAccountNumber(value);

  return <span>{formattedAccountNumber}</span>;
};

export default AccountNumber;
