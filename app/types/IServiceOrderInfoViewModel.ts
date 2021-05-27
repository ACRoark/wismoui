import IServiceOrderViewModelBase from './IServiceOrderViewModelBase';
import { SchedulingErrorCode } from './SchedulingErrorCode';
import { SchedulingOfficeStatusCode } from './SchedulingOfficeStatusCode';
import { VerificationErrorCode } from './VerificationErrorCode';
import { VerificationOfficeStatusCode } from './VerificationOfficeStatusCode';

interface IServiceOrderInfoViewModel extends IServiceOrderViewModelBase {
  errorCode: SchedulingErrorCode | VerificationErrorCode;
  hasError: boolean;
  officeStatusCode: SchedulingOfficeStatusCode | VerificationOfficeStatusCode;
}

export default IServiceOrderInfoViewModel;
