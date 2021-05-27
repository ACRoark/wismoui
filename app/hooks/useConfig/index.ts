import { useSelector } from 'react-redux';

import { IApplicationConfig, IApplicationRootState } from 'types';

const useConfig = (): IApplicationConfig =>
  useSelector((state: IApplicationRootState): IApplicationConfig => state.config);

export default useConfig;
