import IVerificationEventBase from './IVerificationEventBase';
import IVerificationEventStatusUpdate from './IVerificationEventStatusUpdate';

interface IVerificationEvent extends IVerificationEventBase {
  verificationEventStatusUpdates: IVerificationEventStatusUpdate[];
}

export default IVerificationEvent;
