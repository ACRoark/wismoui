import CompletionDate from './CompletionDate';
import IVerificationEventViewModel from './IVerificationEventViewModel';
import { VerificationMomentStatus } from './VerificationMomentStatus';

interface IVerificationMomentViewModel {
  currentStatus: VerificationMomentStatus;
  hasError: boolean;
  history: IVerificationEventViewModel[];
  verificationCompletedOn: CompletionDate;
}

export default IVerificationMomentViewModel;
