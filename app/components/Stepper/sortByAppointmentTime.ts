import { IServiceOrderEvent, SlotTypes } from 'types';

const sortByAppointmentTime = (serviceOrderEvents: IServiceOrderEvent[]): IServiceOrderEvent[] =>
  serviceOrderEvents.sort((first: IServiceOrderEvent, second: IServiceOrderEvent): number => {
    const firstSlot = first.appointment.slotType;
    const secondSlot = second.appointment.slotType;

    if (firstSlot) {
      return secondSlot ? SlotTypes.indexOf(firstSlot) - SlotTypes.indexOf(secondSlot) : -1;
    }

    return secondSlot ? 1 : 0;
  });

export default sortByAppointmentTime;
