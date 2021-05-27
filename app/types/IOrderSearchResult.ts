import IOrderBase from './IOrderBase';
import IOrderRequestInfo from './IOrderRequestInfo';

interface IOrderSearchResult extends IOrderBase {
  orderRequests: IOrderRequestInfo[];
}

export default IOrderSearchResult;
