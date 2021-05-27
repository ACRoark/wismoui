import IVerificationEvent from 'types/IVerificationEvent';
import filterVerificationEventStatusUpdatesByActive from './filterVerificationEventStatusUpdatesByActive';
import filterVerificationEventStatusUpdatesByVerificationCodes from './filterVerificationEventStatusUpdatesByVerificationCodes';

const filterVerificationEvents = (verificationEvents: IVerificationEvent[], verificationCodes: string[]): IVerificationEvent[] => {
  const filteredVerificationEvents: IVerificationEvent[] = [];
  verificationEvents.forEach((event: IVerificationEvent): void => {
    const activeVerificationEventStatusUpdates = filterVerificationEventStatusUpdatesByActive(event.verificationEventStatusUpdates);
    const verificationEventStatusUpdatesByVerificationCodes =
      filterVerificationEventStatusUpdatesByVerificationCodes(activeVerificationEventStatusUpdates, verificationCodes);

    if (verificationEventStatusUpdatesByVerificationCodes.length > 0) {
      const filteredEvent = {
        ...event,
        verificationEventStatusUpdates: verificationEventStatusUpdatesByVerificationCodes
      };

      filteredVerificationEvents.push(filteredEvent);
    }
  });

  return filteredVerificationEvents;
};

export default filterVerificationEvents;
