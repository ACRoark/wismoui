import IOrderRequest from 'types/IOrderRequest';
import IServiceOrderEventStatusUpdate from 'types/IServiceOrderEventStatusUpdate';

const findServiceOrderEventByStatus = (
  request: IOrderRequest,
  status: string,
): IServiceOrderEventStatusUpdate | null => {
  if (request.serviceOrderEvents.length) {
    if (request.serviceOrderEvents[0].latestStatus.serviceOrderEventStatus === status) {
      return request.serviceOrderEvents[0].latestStatus;
    }
  }
  return null;
};

export default findServiceOrderEventByStatus;
