import IServiceOrderEvent from 'types/IServiceOrderEvent';

const hideCanceledCGIServiceOrderEvent = (serviceOrderEvents: IServiceOrderEvent[]): IServiceOrderEvent[] =>
  serviceOrderEvents.filter(
    (serviceOrderEvent: IServiceOrderEvent): boolean =>
      serviceOrderEvent.latestStatus.serviceOrderEventStatus !== 'CANCELED_CGI',
  );

export default hideCanceledCGIServiceOrderEvent;
