import { IServiceOrderEvent } from 'types';
import sortByCreatedAtDateAndTime from '../sortByCreatedAtDateAndTime';

describe('sortByCreatedAtDateAndTime', (): void => {
  it('should sort service order events by most recent created at date and time', (): void => {
    const serviceOrderEvents: IServiceOrderEvent[] = [
      {
        appointment: {
          date: '2020-06-22',
          slotType: 'AM',
        },
        latestStatus: {
          createdAtDate: '20200523',
          createdAtTime: '223440',
          serviceOrderEventStatus: 'CANCELED_CGI',
        },
        product: 'EFR_D1',
        serviceOrderCategory: null,
        serviceOrderId: 'abc123',
      },
      {
        appointment: {
          date: '2020-06-22',
          slotType: 'AM',
        },
        latestStatus: {
          createdAtDate: '20200522',
          createdAtTime: '223443',
          serviceOrderEventStatus: 'CANCELED_CGI',
        },
        product: 'GCC_GS_1H',
        serviceOrderCategory: null,
        serviceOrderId: 'abc123',
      },
    ];

    const expected = [
      {
        appointment: {
          date: '2020-06-22',
          slotType: 'AM',
        },
        latestStatus: {
          createdAtDate: '20200522',
          createdAtTime: '223443',
          serviceOrderEventStatus: 'CANCELED_CGI',
        },
        product: 'GCC_GS_1H',
        serviceOrderCategory: null,
        serviceOrderId: 'abc123',
      },
      {
        appointment: {
          date: '2020-06-22',
          slotType: 'AM',
        },
        latestStatus: {
          createdAtDate: '20200523',
          createdAtTime: '223440',
          serviceOrderEventStatus: 'CANCELED_CGI',
        },
        product: 'EFR_D1',
        serviceOrderCategory: null,
        serviceOrderId: 'abc123',
      },
    ];

    expect(sortByCreatedAtDateAndTime(serviceOrderEvents)).toStrictEqual(expected);
  });
});
