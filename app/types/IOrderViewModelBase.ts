import OrderType from './OrderType';

interface IOrderViewModelBase {
  orderNumber: string;
  orderType: OrderType;
}

export default IOrderViewModelBase;
