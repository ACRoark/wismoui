import IOrderSearchResult from './IOrderSearchResult';

interface ISearchState {
  error?: string;
  loading: boolean;
  results?: IOrderSearchResult[];
}

export default ISearchState;
