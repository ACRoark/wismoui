import IVerificationEventBase from './IVerificationEventBase';
import IVerificationEventStatusUpdate from './IVerificationEventStatusUpdate';

interface IVerificationEventInfo extends IVerificationEventBase {
  latestVerificationEventStatusUpdate: IVerificationEventStatusUpdate;
}

export default IVerificationEventInfo;
