import { OrderType, OrderTypes } from 'types';

import generate from './generate';

const getPrefixIndex = (orderType?: OrderType): number => {
  if (orderType) {
    return OrderTypes.indexOf(orderType);
  }

  return generate.randomNumber(0, 2);
};

const generateOrderNumber = (orderType?: OrderType): string => {
  const orderTypePrefixes = ['MI', 'MO', 'MT'];

  const index = getPrefixIndex(orderType);

  const numberPart = generate.randomNumber(10000000, 99999999);

  return `${orderTypePrefixes[index]}${numberPart}`;
};

export default generateOrderNumber;
