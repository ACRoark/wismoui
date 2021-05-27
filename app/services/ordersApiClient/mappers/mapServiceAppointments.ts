import { IServiceAppointmentViewModel, IServiceOrderEvent } from 'types';

// Each service order event is for a single product, single appointment with a single time slot
// So each product will be represented by a separate service order event

// Scenarios:
// - one service order event with no appointment
// - one service order event with one appointment for one product (i.e. one time slot)
// - two service order events with one appointment for multiple products (i.e. multiple time slots)

const mapServiceAppointments = (serviceOrderEvents: IServiceOrderEvent[]): IServiceAppointmentViewModel[] => {
  const appointments: IServiceAppointmentViewModel[] = [];

  serviceOrderEvents.forEach((serviceOrderEvent: IServiceOrderEvent): void => {
    const { appointment } = serviceOrderEvent;

    // TODO: There has to be a cleaner way to do this (using map/reduce?)
    if (appointment) {
      const appointmentDate = new Date(appointment.date);

      let match = appointments.find(
        (viewModel: IServiceAppointmentViewModel): boolean => viewModel.appointmentDate === appointmentDate,
      );

      if (!match) {
        match = {
          appointmentDate,
          timeSlots: [],
        };

        appointments.push(match);
      }

      match.timeSlots.push({
        service: serviceOrderEvent.product,
        timeSlot: appointment.slotType,
      });
    }
  });

  return appointments;
};

export default mapServiceAppointments;
