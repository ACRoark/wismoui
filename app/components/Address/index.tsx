import React from 'react';

import AddressFormat from 'components/Address/AddressFormat';
import IAddress from 'types/IAddress';

import formatAddress from './formatAddress';

import './index.less';

interface IAddressProps {
  address: IAddress;
  format?: AddressFormat;
}

const Address: React.FC<IAddressProps> = (props: IAddressProps): React.ReactElement => {
  const { address, format = 'block' } = props;

  return <address className="dte-wismo-address">{formatAddress(address, format)}</address>;
};

export default Address;
