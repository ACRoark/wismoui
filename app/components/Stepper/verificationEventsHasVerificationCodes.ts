import IVerificationEvent from 'types/IVerificationEvent';
import IVerificationEventStatusUpdate from 'types/IVerificationEventStatusUpdate';

const verificationEventsHasVerificationCodes = (verificationEvents: IVerificationEvent[], verificationCodes: string[]): boolean => {
  let verificationCodeExists = false;
  verificationEvents.forEach((event: IVerificationEvent) => {
    event.verificationEventStatusUpdates.forEach((statusUpdate: IVerificationEventStatusUpdate) => {
      if (verificationCodes.includes(statusUpdate.verificationCode)) {
        verificationCodeExists = true;

        return verificationCodeExists;
      }

      return verificationCodeExists;
    });
  });

  return verificationCodeExists;
};

export default verificationEventsHasVerificationCodes;
