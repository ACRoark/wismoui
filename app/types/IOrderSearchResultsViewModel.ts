import IOrderSearchResultViewModel from './IOrderSearchResultViewModel';

// TODO: Consider whether this interface should exist. Maybe there props should be directly on ISearchOrdersResponse.
interface IOrderSearchResultsViewModel {
  closedOrders: IOrderSearchResultViewModel[];
  openOrders: IOrderSearchResultViewModel[];
}

export default IOrderSearchResultsViewModel;
