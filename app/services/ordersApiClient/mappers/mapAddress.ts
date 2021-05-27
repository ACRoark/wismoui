import { IAddress, IAddressViewModel } from 'types';

const mapAddress = (address: IAddress): IAddressViewModel => ({
  ...address,
});

export default mapAddress;
