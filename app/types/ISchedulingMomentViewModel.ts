import CompletionDate from './CompletionDate';
import ISchedulingEventViewModel from './ISchedulingEventViewModel';
import IServiceAppointmentViewModel from './IServiceAppointmentViewModel';
import { SchedulingMomentStatus } from './SchedulingMomentStatus';

interface ISchedulingMomentViewModel {
  appointments: IServiceAppointmentViewModel[];
  currentStatus: SchedulingMomentStatus;
  hasError: boolean;
  history: ISchedulingEventViewModel[];
  schedulingCompletedOn: CompletionDate;
}

export default ISchedulingMomentViewModel;
