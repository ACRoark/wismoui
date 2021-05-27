import IAppointmentTimeSlotViewModel from './IAppointmentTimeSlotViewModel';

interface IServiceAppointmentViewModel {
  appointmentDate: Date;
  timeSlots: IAppointmentTimeSlotViewModel[];
}

export default IServiceAppointmentViewModel;
