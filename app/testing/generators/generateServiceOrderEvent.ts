import { IServiceOrderEvent } from 'types';

import generateProductType from './generateProductType';
import generateServiceAppointment from './generateServiceAppointment';
import generateServiceOrderEventStatusUpdate from './generateServiceOrderEventStatusUpdate';

const generateServiceOrderEvent = (): IServiceOrderEvent => ({
  appointment: generateServiceAppointment(),
  latestStatus: generateServiceOrderEventStatusUpdate(),
  product: generateProductType(),
  serviceOrderCategory: null,
  serviceOrderId: null,
});

const generateServiceOrderEventArray = (count: number = 1): IServiceOrderEvent[] => {
  const events: IServiceOrderEvent[] = [];

  for (let i = 0; i < count; i++) {
    events.push(generateServiceOrderEvent());
  }

  return events;
};

export { generateServiceOrderEvent, generateServiceOrderEventArray };
