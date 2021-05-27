import IMomentsViewModel from './IMomentsViewModel';
import IServiceOrderViewModelBase from './IServiceOrderViewModelBase';
import ServiceType from './ServiceType';

interface IServiceOrderViewModel extends IServiceOrderViewModelBase {
  contactPhoneNumber: string;
  moments: IMomentsViewModel;
  services: ServiceType[];
}

export default IServiceOrderViewModel;
