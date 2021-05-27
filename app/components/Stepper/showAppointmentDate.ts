import IServiceOrderEvent from 'types/IServiceOrderEvent';

const showAppointmentDate = (serviceOrderEvents: IServiceOrderEvent[]): boolean => {
  let flag = false;
  serviceOrderEvents.forEach((serviceOrderEvent: IServiceOrderEvent): void => {
    if (!['CALL_DTE', 'DELAYED', 'RESCHEDULED'].includes(serviceOrderEvent.latestStatus.serviceOrderEventStatus)) {
      flag = true;
    }
  });
  return flag;
};

export default showAppointmentDate;
