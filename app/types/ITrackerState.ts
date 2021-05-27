import IOrder from './IOrder';

interface ITrackerState {
  error?: string;
  loading: boolean;
  order?: IOrder;
}

export default ITrackerState;
