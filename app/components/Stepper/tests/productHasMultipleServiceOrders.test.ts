import { IServiceOrderEvent } from 'types';
import productHasMultipleServiceOrders from '../productHasMultipleServiceOrders';

describe('productHasMultipleServiceOrders', (): void => {
  it('should return false when given multiple service orders with unique products', (): void => {
    const serviceOrderEvents: IServiceOrderEvent[] = [
      {
        appointment: {
          date: '2020-06-22',
          slotType: 'AM',
        },
        latestStatus: {
          createdAtDate: '20200522',
          createdAtTime: '223443',
          serviceOrderEventStatus: 'COMPLETED',
        },
        product: 'EFR_D1',
        serviceOrderCategory: null,
        serviceOrderId: 'abc123',
      },
      {
        appointment: {
          date: '2020-06-22',
          slotType: 'PM',
        },
        latestStatus: {
          createdAtDate: '20200522',
          createdAtTime: '223443',
          serviceOrderEventStatus: 'COMPLETED',
        },
        product: 'GCC_GS_1H',
        serviceOrderCategory: null,
        serviceOrderId: 'abc123',
      },
    ];

    expect(productHasMultipleServiceOrders('EFR_D1', serviceOrderEvents)).toBe(false);
  });

  it('should return true when given multiple service orders of the same product', (): void => {
    const serviceOrderEvents: IServiceOrderEvent[] = [
      {
        appointment: {
          date: '2020-06-22',
          slotType: 'AM',
        },
        latestStatus: {
          createdAtDate: '20200522',
          createdAtTime: '223443',
          serviceOrderEventStatus: 'COMPLETED',
        },
        product: 'EFR_D1',
        serviceOrderCategory: null,
        serviceOrderId: 'abc123',
      },
      {
        appointment: {
          date: '2020-06-22',
          slotType: 'PM',
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
          createdAtDate: '20200522',
          createdAtTime: '223443',
          serviceOrderEventStatus: 'RESCHEDULED',
        },
        product: 'GCC_GS_1H',
        serviceOrderCategory: null,
        serviceOrderId: 'abc123',
      },
    ];

    expect(productHasMultipleServiceOrders('GCC_GS_1H', serviceOrderEvents)).toBe(true);
  });
});
