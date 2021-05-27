import { IServiceOrderEvent } from 'types';

const filterByMostRecentProducts = (serviceOrderEvents: IServiceOrderEvent[]): IServiceOrderEvent[] => {
  const cache = {};
  const mostRecentServiceOrderEventsByProduct: IServiceOrderEvent[] = [];

  for (let i = serviceOrderEvents.length - 1; i >= 0; i--) {
    if (!cache[serviceOrderEvents[i].product]) {
      cache[serviceOrderEvents[i].product] = true;
      mostRecentServiceOrderEventsByProduct.push(serviceOrderEvents[i]);
    }
  }

  return mostRecentServiceOrderEventsByProduct.reverse();
};

export default filterByMostRecentProducts;
