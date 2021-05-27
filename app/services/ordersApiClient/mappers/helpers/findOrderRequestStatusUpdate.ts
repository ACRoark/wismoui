import { IOrderRequest, IOrderRequestStatusUpdate, OrderRequestStatus } from 'types';

type FindOrderRequestStatusUpdatesType = IOrderRequestStatusUpdate | undefined;

const findOrderRequestStatusUpdates = (
  orderRequest: IOrderRequest,
  status: OrderRequestStatus,
): FindOrderRequestStatusUpdatesType =>
  orderRequest.orderRequestStatusUpdates.find(
    (update: IOrderRequestStatusUpdate): boolean => update.orderRequestStatus === status,
  );

export default findOrderRequestStatusUpdates;
