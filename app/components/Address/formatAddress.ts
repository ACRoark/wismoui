import { IAddress } from 'types';

import AddressFormat from './AddressFormat';

const formatAddress = (address: IAddress, format: AddressFormat): string => {
  const { city, line1, line2, state, zip } = address;

  const street = line1 + (line2 ? `, ${line2}` : '');

  if (format === 'street') {
    return street;
  }

  if (zip.indexOf('-') > -1) {
    const shortZip = zip.substring(0, zip.indexOf('-'));

    return `${street}\n${city}, ${state} ${shortZip}`;
  }

  return `${street}\n${city}, ${state} ${zip}`;
};

export default formatAddress;
