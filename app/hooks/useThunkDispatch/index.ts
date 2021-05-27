import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { IApplicationRootState } from 'types';

// tslint:disable-next-line: no-any
type ReduxDispatch = ThunkDispatch<IApplicationRootState, any, Action>;

const useThunkDispatch = (): ReduxDispatch => useDispatch<ReduxDispatch>();

export default useThunkDispatch;
