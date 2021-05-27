import IOrderRequest from 'types/IOrderRequest';

const isOrderRequestStatusNeedsVerification = (request: IOrderRequest): boolean => {
  const { orderRequestStatusUpdates } = request;

  if (!orderRequestStatusUpdates.length) {
    return false;
  }

  return orderRequestStatusUpdates[orderRequestStatusUpdates.length - 1].orderRequestStatus === 'NEEDS_VERIFICATION';
};

export default isOrderRequestStatusNeedsVerification;
