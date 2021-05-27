import * as React from 'react';

interface ICustomerNameProps {
  name: string;
}

const CustomerName: React.FC<ICustomerNameProps> = (props: ICustomerNameProps): React.ReactElement => {
  const { name } = props;

  return <span>{name}</span>;
};

export default CustomerName;
