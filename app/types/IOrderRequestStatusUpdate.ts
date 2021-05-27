import OrderRequestStatus from './OrderRequestStatus';

interface IOrderRequestStatusUpdate {
  createdAtDate: string;
  createdAtTime: string;
  orderRequestStatus: OrderRequestStatus;
}

export default IOrderRequestStatusUpdate;
