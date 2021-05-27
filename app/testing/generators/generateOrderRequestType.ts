import { OrderRequestType, OrderRequestTypes } from 'types';

import generateRandomNumber from './generateRandomNumber';

const generateOrderRequestType = (): OrderRequestType =>
  OrderRequestTypes[generateRandomNumber(0, OrderRequestTypes.length - 1)] as OrderRequestType;

export default generateOrderRequestType;
