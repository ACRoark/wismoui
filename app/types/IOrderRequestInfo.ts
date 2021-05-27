import IOrderRequestBase from './IOrderRequestBase';
import IOrderRequestStatusUpdate from './IOrderRequestStatusUpdate';
import IVerificationEventInfo from './IVerificationEventInfo';

interface IOrderRequestInfo extends IOrderRequestBase {
  currentOrderRequestStatus: IOrderRequestStatusUpdate | null;
  verificationEvents: IVerificationEventInfo[];
}

export default IOrderRequestInfo;
