import IServiceOrderEvent from './IServiceOrderEvent';

interface IAppointmentList {
  appointments: IServiceOrderEvent[];
  completed: boolean;
  date: string;
  key: string;
  showEditLink: boolean;
}

export default IAppointmentList;
