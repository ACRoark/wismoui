import { OrderType, OrderTypes } from 'types';

import generateRandomNumber from './generateRandomNumber';

const generateOrderType = (): OrderType => OrderTypes[generateRandomNumber(0, OrderTypes.length - 1)] as OrderType;

export default generateOrderType;
