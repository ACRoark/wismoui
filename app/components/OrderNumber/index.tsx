import * as React from 'react';

interface IOrderNumberProps {
  value: string;
}

const OrderNumber: React.FC<IOrderNumberProps> = (props: IOrderNumberProps): React.ReactElement => {
  const { value } = props;

  const formatOrderNumber = (input: string): string => {
    return `${input.substr(0, 2)} ${input.substr(2, 4)} ${input.substr(6, 10)}`;
  };

  const regex = new RegExp('^[A-Z]{2}[0-9]{8}$', 'g');

  if (!regex.test(value)) {
    throw new Error('orders must start with MI or MO or MT followed by 8 digits');
  }

  return <span>{formatOrderNumber(value)}</span>;
};

export default OrderNumber;
