import { ServiceOrderEventStatus } from './ServiceOrderEventStatus';

interface IServiceOrderEventStatusUpdate {
  createdAtDate: string;
  createdAtTime: string;
  serviceOrderEventStatus: ServiceOrderEventStatus;
}

export default IServiceOrderEventStatusUpdate;
