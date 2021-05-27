import IServiceAppointment from './IServiceAppointment';
import IServiceOrderEventStatusUpdate from './IServiceOrderEventStatusUpdate';
import ProductType from './ProductType';

interface IServiceOrderEvent {
  appointment: IServiceAppointment;
  latestStatus: IServiceOrderEventStatusUpdate;
  product: ProductType;
  serviceOrderCategory?: string | null;
  serviceOrderId: string | null;
}

export default IServiceOrderEvent;
