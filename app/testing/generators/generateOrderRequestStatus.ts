import { OrderRequestStatus, OrderRequestStatuses } from 'types';

import generateRandomNumber from './generateRandomNumber';

const generateOrderRequestStatus = (): OrderRequestStatus =>
  OrderRequestStatuses[generateRandomNumber(0, OrderRequestStatuses.length - 1)] as OrderRequestStatus;

export default generateOrderRequestStatus;
