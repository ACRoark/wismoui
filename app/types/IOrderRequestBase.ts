import IAddress from './IAddress';
import IProduct from './IProduct';
import OrderRequestType from './OrderRequestType';

interface IOrderRequestBase {
  accountNumber: string | null;
  address: IAddress;
  orderRequestType: OrderRequestType;
  premiseId: string;
  products: IProduct[];
  wantDate: string;
}

export default IOrderRequestBase;
