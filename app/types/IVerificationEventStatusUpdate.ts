import VerificationEventStatusType from 'types/VerificationEventStatusType';

interface IVerificationEventStatusUpdate {
  createdAtDate: string;
  createdAtTime: string;
  verificationCode: string;
  verificationEventStatus: VerificationEventStatusType;
}

export default IVerificationEventStatusUpdate;
