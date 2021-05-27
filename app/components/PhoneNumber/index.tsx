import * as React from 'react';
import formatPhoneNumber from './formatPhoneNumber';

interface IPhoneNumberProps {
  className?: string;
  value: string | null;
}

const PhoneNumber: React.FC<IPhoneNumberProps> = (props: IPhoneNumberProps): React.ReactElement => {
  const { className, value } = props;

  if (value) {
    if (value.length !== 10 && value.length !== 7) {
      throw new Error('phone numbers must be 10 or 7 numeric digits.');
    }

    const formattedPhoneNumber = formatPhoneNumber(value);

    return <span className={className}>{formattedPhoneNumber}</span>;
  }

  return <></>;
};

export default PhoneNumber;
