import { IAppointmentList } from 'types';

const getAppointmentDates = (appointmentList: IAppointmentList[]): string[] => {
  const dates: string[] = [];

  appointmentList.forEach((appointment: IAppointmentList): void => {
    if (!appointment.completed) {
      dates.push(appointment.date);
    }
  });

  return dates;
};

export default getAppointmentDates;
