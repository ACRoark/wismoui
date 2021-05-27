import { useSelector } from 'react-redux';

import { IApplicationRootState, IFeatureFlags } from 'types';

const useFlags = (): IFeatureFlags => useSelector((state: IApplicationRootState): IFeatureFlags => state.config.flags);

export default useFlags;
