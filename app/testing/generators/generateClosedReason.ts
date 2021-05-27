import { ClosedReason, ClosedReasons } from 'types';

import generateRandomNumber from './generateRandomNumber';

const generateClosedReason = (): ClosedReason =>
  ClosedReasons[generateRandomNumber(0, ClosedReasons.length - 1)] as ClosedReason;

export default generateClosedReason;
