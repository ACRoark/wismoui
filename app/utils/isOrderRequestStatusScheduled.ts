import IOrderRequest from 'types/IOrderRequest';

const isOrderRequestStatusScheduled = (request: IOrderRequest): boolean => {
  const { orderRequestStatusUpdates } = request;

  if (orderRequestStatusUpdates.length) {
    return orderRequestStatusUpdates[orderRequestStatusUpdates.length - 1].orderRequestStatus === 'SCHEDULED';
  }
  return false;
};

export default isOrderRequestStatusScheduled;
