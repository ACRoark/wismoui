import IOrderViewModelBase from './IOrderViewModelBase';
import IServiceOrderViewModel from './IServiceOrderViewModel';

interface IOrderViewModel extends IOrderViewModelBase {
  serviceOrders: IServiceOrderViewModel[];
}

export default IOrderViewModel;
