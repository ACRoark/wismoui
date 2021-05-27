import { IOrderRequestStatusUpdate } from 'types';

// orderRequestStatusUpdates must be sorted before filtered for duplicates

const filterDuplicateStatusUpdates = (
  orderRequestStatusUpdates: IOrderRequestStatusUpdate[],
): IOrderRequestStatusUpdate[] => {
  const cache = {};
  const filteredOrderStatusUpdates: IOrderRequestStatusUpdate[] = [];

  for (let i = orderRequestStatusUpdates.length - 1; i >= 0; i--) {
    if (!cache[orderRequestStatusUpdates[i].orderRequestStatus]) {
      cache[orderRequestStatusUpdates[i].orderRequestStatus] = true;
      filteredOrderStatusUpdates.push(orderRequestStatusUpdates[i]);
    }
  }

  return filteredOrderStatusUpdates.reverse();
};

export default filterDuplicateStatusUpdates;
