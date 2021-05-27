import { useSelector } from 'react-redux';

import { IApplicationRootState, ITrackerState } from 'types';

const useTracker = (): ITrackerState => useSelector((state: IApplicationRootState): ITrackerState => state.tracker);

export default useTracker;
