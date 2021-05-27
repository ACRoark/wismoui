import { useSelector } from 'react-redux';

import { IApplicationRootState, ISearchState } from 'types';

const useSearch = (): ISearchState => useSelector((state: IApplicationRootState): ISearchState => state.search);

export default useSearch;
