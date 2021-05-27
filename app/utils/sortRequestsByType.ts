import { IOrderRequestInfo } from '../types';

const sortRequestsByType = (requests: IOrderRequestInfo[]): IOrderRequestInfo[] =>
  requests.sort((a: IOrderRequestInfo, b: IOrderRequestInfo): number =>
    a.orderRequestType > b.orderRequestType ? 1 : b.orderRequestType > a.orderRequestType ? -1 : 0,
  );

export default sortRequestsByType;
