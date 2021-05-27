import ServiceType from './ServiceType';
import { TimeSlot } from './TimeSlot';

interface IAppointmentTimeSlotViewModel {
  service: ServiceType;
  timeSlot: TimeSlot;
}

export default IAppointmentTimeSlotViewModel;
