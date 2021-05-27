import { IServiceAppointment } from 'types';
import { generateFutureDate } from './generateDate';
import generateSlotType from './generateSlotType';

const generateServiceAppointment = (): IServiceAppointment => ({
  date: generateFutureDate(),
  slotType: generateSlotType(),
});

export default generateServiceAppointment;
