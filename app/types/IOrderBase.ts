import CreatedBy from './CreatedBy';
import IClosedDetails from './IClosedDetails';
import ICustomer from './ICustomer';
import OrderType from './OrderType';

interface IOrderBase {
  closedDetails: IClosedDetails | null;
  createdAt: string;
  createdBy: CreatedBy;
  customer: ICustomer;
  orderNumber: string;
  orderType: OrderType;
}

export default IOrderBase;
