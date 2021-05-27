import React from 'react';

import Address from 'components/Address';
import BaseFormField from 'components/BaseField';

import IAddress from 'types/IAddress';

import messages from './messages';

interface IAddressFieldProps {
  address: IAddress;
}

const AddressField: React.FC<IAddressFieldProps> = (props: IAddressFieldProps): React.ReactElement => {
  const { address } = props;

  return (
    <BaseFormField label={messages.addressFieldLabel}>
      <Address address={address} />
    </BaseFormField>
  );
};

export default AddressField;
