import { IProduct, IServiceOrderEvent } from 'types';

import getActiveProduct from './getActiveProduct';

const filterActiveServiceOrders = (
  products: IProduct[],
  serviceOrderEvents: IServiceOrderEvent[],
): IServiceOrderEvent[] =>
  serviceOrderEvents.filter((serviceOrderEvent: IServiceOrderEvent): boolean => {
    const { product } = serviceOrderEvent;

    if (serviceOrderEvent.latestStatus.serviceOrderEventStatus !== 'CANCELED') {
      return true;
    }

    const activeProduct: IProduct | undefined = getActiveProduct(product, products);

    return !!activeProduct;
  });

export default filterActiveServiceOrders;
