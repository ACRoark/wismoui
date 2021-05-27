import { useSelector } from 'react-redux';

import { IApplicationRootState, IAuthenticationState } from 'types';

const useAuth = (): IAuthenticationState =>
  useSelector((state: IApplicationRootState): IAuthenticationState => state.auth);

export default useAuth;
