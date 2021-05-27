import IOrderSearchCounts from './IOrderSearchCounts';
import IOrderSearchResult from './IOrderSearchResult';

interface IOrderSearchResults {
  counts: IOrderSearchCounts;
  orders: IOrderSearchResult[];
}

export default IOrderSearchResults;
