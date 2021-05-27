import React from 'react';
import 'react-responsive-modal/styles.css';

import BaseFormField from 'components/BaseField';
import EditPhoneNumberLink from 'components/EditPhoneNumberLink';
import PhoneNumber from '../PhoneNumber';

import messages from './messages';

import './index.less';

interface IPhoneNumberFieldProps {
  phoneNumber: string | null;
  serviceDate: string;
}

const PhoneNumberField: React.FC<IPhoneNumberFieldProps> = (props: IPhoneNumberFieldProps): React.ReactElement => {
  const { phoneNumber, serviceDate } = props;

  return (
    <>
      <BaseFormField label={messages.label}>
        <div className="dte-wismo-phone-number-field">
          <PhoneNumber className="dte-wismo-phone-number-field-value" value={phoneNumber} />
          {phoneNumber && <EditPhoneNumberLink serviceDate={serviceDate} />}
        </div>
      </BaseFormField>
    </>
  );
};

export default PhoneNumberField;
