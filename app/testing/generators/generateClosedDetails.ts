import { IClosedDetails } from 'types';

import generateClosedReason from './generateClosedReason';
import { generatePastDate } from './generateDate';

const generateClosedDetails = (): IClosedDetails => ({
  closedAt: generatePastDate(),
  reason: generateClosedReason(),
});

export default generateClosedDetails;
