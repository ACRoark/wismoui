import IOrderViewModelBase from './IOrderViewModelBase';
import IServiceOrderInfoViewModel from './IServiceOrderInfoViewModel';

interface IOrderSearchResultViewModel extends IOrderViewModelBase {
  serviceOrders: IServiceOrderInfoViewModel[];
}

export default IOrderSearchResultViewModel;
