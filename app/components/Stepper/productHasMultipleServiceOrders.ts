import { IServiceOrderEvent, ProductType } from 'types';

const productHasMultipleServiceOrders = (product: ProductType, serviceOrderEvents: IServiceOrderEvent[]): boolean =>
  serviceOrderEvents.filter((serviceOrderEvent: IServiceOrderEvent): boolean => product === serviceOrderEvent.product)
    .length > 1;

export default productHasMultipleServiceOrders;
