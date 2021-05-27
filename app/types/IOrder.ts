import IOrderBase from './IOrderBase';
import IOrderRequest from './IOrderRequest';

interface IOrder extends IOrderBase {
  orderRequests: IOrderRequest[];
}

export default IOrder;
