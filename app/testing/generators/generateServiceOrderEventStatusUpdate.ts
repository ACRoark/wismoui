import { IServiceOrderEventStatusUpdate } from 'types';

import { generatePastDate } from './generateDate';
import generateServiceOrderEventStatus from './generateServiceOrderEventStatus';

const generateServiceOrderEventStatusUpdate = (): IServiceOrderEventStatusUpdate => ({
  createdAtDate: generatePastDate(),
  createdAtTime: generatePastDate(),
  serviceOrderEventStatus: generateServiceOrderEventStatus(),
});

export default generateServiceOrderEventStatusUpdate;
