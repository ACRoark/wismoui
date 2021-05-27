import IOrderRequestBase from './IOrderRequestBase';
import IOrderRequestStatusUpdate from './IOrderRequestStatusUpdate';
import IServiceOrderEvent from './IServiceOrderEvent';
import IVerificationEvent from './IVerificationEvent';

interface IOrderRequest extends IOrderRequestBase {
  contactPhoneNumber: string;
  orderRequestStatusUpdates: IOrderRequestStatusUpdate[];
  serviceOrderEvents: IServiceOrderEvent[];
  verificationEvents: IVerificationEvent[];
}

export default IOrderRequest;
