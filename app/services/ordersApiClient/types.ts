import { IHttpError } from 'services/httpClient';
import { IOrder } from 'types';
import IOrderSearchResults from 'types/IOrderSearchResults';
import IOrderSearchResultsViewModel from 'types/IOrderSearchResultsViewModel';
import IOrderViewModel from 'types/IOrderViewModel';

export interface IFindOrderResponse {
  error?: IHttpError;
  order: IOrder;
  viewModel?: IOrderViewModel;
}

export interface IGetOrderResponse {
  error?: IHttpError;
  order: IOrder;
  viewModel?: IOrderViewModel;
}

export interface ISearchOrdersResponse {
  error?: IHttpError;
  results: IOrderSearchResults;
  viewModel?: IOrderSearchResultsViewModel;
}
