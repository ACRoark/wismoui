import { IMomentsViewModel, IOrderRequest } from 'types';

import mapCompletedMoment from './mapCompletedMoment';
import mapRequestedMoment from './mapRequestedMoment';
import mapSchedulingMoment from './mapSchedulingMoment';
import mapVerificationMoment from './mapVerificationMoment';

const mapMoments = (orderRequest: IOrderRequest): IMomentsViewModel => ({
  completed: mapCompletedMoment(orderRequest),
  requested: mapRequestedMoment(orderRequest),
  scheduling: mapSchedulingMoment(orderRequest),
  verification: mapVerificationMoment(orderRequest),
});

export default mapMoments;
