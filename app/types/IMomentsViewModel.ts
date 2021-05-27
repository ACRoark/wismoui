import ICompletedMomentViewModel from './ICompletedMomentViewModel';
import IRequestedMomentViewModel from './IRequestedMomentViewModel';
import ISchedulingMomentViewModel from './ISchedulingMomentViewModel';
import IVerificationMomentViewModel from './IVerificationMomentViewModel';

interface IMomentsViewModel {
  completed: ICompletedMomentViewModel;
  requested: IRequestedMomentViewModel;
  scheduling: ISchedulingMomentViewModel;
  verification: IVerificationMomentViewModel;
}

export default IMomentsViewModel;
