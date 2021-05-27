import IAddressViewModel from './IAddressViewModel';
import ServiceDate from './ServiceDate';
import { ServiceOrderType } from './ServiceOrderType';

interface IServiceOrderViewModelBase {
  address: IAddressViewModel;
  serviceDate: ServiceDate;
  serviceOrderType: ServiceOrderType;
}

export default IServiceOrderViewModelBase;
