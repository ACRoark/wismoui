import DateTime from './DateTime';
import { VerificationErrorCode } from './VerificationErrorCode';
import { VerificationOfficeStatusCode } from './VerificationOfficeStatusCode';

interface IVerificationEventViewModel {
  errorCode: VerificationErrorCode;
  occurredAt: DateTime;
  officeStatusCode: VerificationOfficeStatusCode;
}

export default IVerificationEventViewModel;
