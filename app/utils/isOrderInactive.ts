import { IOrder } from 'types';

const isOrderInactive = (order: IOrder): boolean =>
  order.closedDetails !== null && order.closedDetails.reason !== 'CANCELED';

export default isOrderInactive;
