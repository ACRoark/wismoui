import DateTime from './DateTime';
import { SchedulingErrorCode } from './SchedulingErrorCode';
import { SchedulingOfficeStatusCode } from './SchedulingOfficeStatusCode';

interface ISchedulingEventViewModel {
  errorCode: SchedulingErrorCode;
  occurredAt: DateTime;
  officeStatusCode: SchedulingOfficeStatusCode;
}

export default ISchedulingEventViewModel;
