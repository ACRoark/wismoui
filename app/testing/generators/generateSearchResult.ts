import { IOrderSearchResult } from 'types';

import generate from './generate';
import generateCustomer from './generateCustomer';
import generateOrderNumber from './generateOrderNumber';
import { generateOrderRequestInfoArray } from './generateOrderRequest';

const generateSearchResult = (): IOrderSearchResult => {
  const orderType = generate.orderType();

  return {
    closedDetails: { closedAt: '', reason: null },
    createdAt: generate.pastDate(),
    createdBy: 'WEB',
    customer: generateCustomer(),
    orderNumber: generateOrderNumber(orderType),
    orderRequests: generateOrderRequestInfoArray(),
    orderType,
  };
};

export default generateSearchResult;
