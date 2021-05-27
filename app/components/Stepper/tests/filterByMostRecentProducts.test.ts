import { IServiceOrderEvent } from 'types';
import filterByMostRecentProducts from '../filterByMostRecentProducts';

describe('filterByMostRecentProducts', (): void => {
  it('should return the most recent service order events for each product', (): void => {
    const serviceOrderEvents: IServiceOrderEvent[] = [
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
      {
        appointment: {
          date: '2020-06-23',
          slotType: 'PM',
        },
        latestStatus: {
          createdAtDate: '20200622',
          createdAtTime: '223443',
          serviceOrderEventStatus: 'RESCHEDULED',
        },
        product: 'GCC_GS_1H',
        serviceOrderCategory: null,
        serviceOrderId: 'abc123',
      },
      {
        appointment: {
          date: '2020-06-23',
          slotType: 'AM',
        },
        latestStatus: {
          createdAtDate: '20200622',
          createdAtTime: '223443',
          serviceOrderEventStatus: 'DELAYED',
        },
        product: 'EFR_D1',
        serviceOrderCategory: null,
        serviceOrderId: 'abc123',
      },
    ];

    const expected: IServiceOrderEvent[] = [
      {
        appointment: {
          date: '2020-06-23',
          slotType: 'PM',
        },
        latestStatus: {
          createdAtDate: '20200622',
          createdAtTime: '223443',
          serviceOrderEventStatus: 'RESCHEDULED',
        },
        product: 'GCC_GS_1H',
        serviceOrderCategory: null,
        serviceOrderId: 'abc123',
      },
      {
        appointment: {
          date: '2020-06-23',
          slotType: 'AM',
        },
        latestStatus: {
          createdAtDate: '20200622',
          createdAtTime: '223443',
          serviceOrderEventStatus: 'DELAYED',
        },
        product: 'EFR_D1',
        serviceOrderCategory: null,
        serviceOrderId: 'abc123',
      },
    ];

    expect(filterByMostRecentProducts(serviceOrderEvents)).toStrictEqual(expected);
  });

  it('should return the service order event when given one service order event', (): void => {
    const serviceOrderEvents: IServiceOrderEvent[] = [
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
        product: 'EFR_D1',
        serviceOrderCategory: null,
        serviceOrderId: 'abc123',
      },
    ];

    expect(filterByMostRecentProducts(serviceOrderEvents)).toStrictEqual(serviceOrderEvents);
  });
});
