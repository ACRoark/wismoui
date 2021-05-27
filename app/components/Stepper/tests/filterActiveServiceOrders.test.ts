import { IProduct, IServiceOrderEvent } from 'types';
import filterActiveServiceOrders from '../filterActiveServiceOrders';

describe('filterActiveServiceOrders', (): void => {
  it('should remove a service order that is canceled that also has a product which is canceled', (): void => {
    const products: IProduct[] = [
      {
        docId: null,
        isCanceled: false,
        processedAtDate: '20200620',
        productType: 'EFR_D1',
        serviceDate: '20200630',
      },
      {
        docId: null,
        isCanceled: true,
        processedAtDate: '20200620',
        productType: 'EFR_D1_1',
        serviceDate: '2020-06-22',
      },
    ];

    const serviceOrderEvents: IServiceOrderEvent[] = [
      {
        appointment: {
          date: '20200925',
          slotType: null,
        },
        latestStatus: {
          createdAtDate: '20200922',
          createdAtTime: '140205',
          serviceOrderEventStatus: 'CANCELED',
        },
        product: 'EFR_D1',
        serviceOrderCategory: 'SDI1',
        serviceOrderId: '800008161708',
      },
      {
        appointment: {
          date: '20200925',
          slotType: null,
        },
        latestStatus: {
          createdAtDate: '20200922',
          createdAtTime: '140209',
          serviceOrderEventStatus: 'CANCELED',
        },
        product: 'EFR_D1_1',
        serviceOrderCategory: 'SDI1',
        serviceOrderId: '800008161709',
      },
    ];

    const expected: IServiceOrderEvent[] = [
      {
        appointment: {
          date: '20200925',
          slotType: null,
        },
        latestStatus: {
          createdAtDate: '20200922',
          createdAtTime: '140205',
          serviceOrderEventStatus: 'CANCELED',
        },
        product: 'EFR_D1',
        serviceOrderCategory: 'SDI1',
        serviceOrderId: '800008161708',
      },
    ];

    expect(filterActiveServiceOrders(products, serviceOrderEvents)).toEqual(expected);
  });

  it('should remove multiple service orders when the service order is canceled and the product is also canceled', (): void => {
    const products: IProduct[] = [
      {
        docId: null,
        isCanceled: false,
        processedAtDate: '20200620',
        productType: 'EFR_D1',
        serviceDate: '20200630',
      },
      {
        docId: null,
        isCanceled: true,
        processedAtDate: '20200620',
        productType: 'EFR_D1_1',
        serviceDate: '2020-06-22',
      },
      {
        docId: null,
        isCanceled: true,
        processedAtDate: '20200620',
        productType: 'GFR_AS_H',
        serviceDate: '2020-06-22',
      },
    ];

    const serviceOrderEvents: IServiceOrderEvent[] = [
      {
        appointment: {
          date: '20200925',
          slotType: null,
        },
        latestStatus: {
          createdAtDate: '20200922',
          createdAtTime: '140205',
          serviceOrderEventStatus: 'CANCELED',
        },
        product: 'EFR_D1',
        serviceOrderCategory: 'SDI1',
        serviceOrderId: '800008161708',
      },
      {
        appointment: {
          date: '20200925',
          slotType: null,
        },
        latestStatus: {
          createdAtDate: '20200922',
          createdAtTime: '140209',
          serviceOrderEventStatus: 'CANCELED',
        },
        product: 'EFR_D1_1',
        serviceOrderCategory: 'SDI1',
        serviceOrderId: '800008161709',
      },
      {
        appointment: {
          date: '20200925',
          slotType: null,
        },
        latestStatus: {
          createdAtDate: '20200922',
          createdAtTime: '140209',
          serviceOrderEventStatus: 'CANCELED',
        },
        product: 'GFR_AS_H',
        serviceOrderCategory: 'SDI1',
        serviceOrderId: '800008161709',
      },
    ];

    const expected: IServiceOrderEvent[] = [
      {
        appointment: {
          date: '20200925',
          slotType: null,
        },
        latestStatus: {
          createdAtDate: '20200922',
          createdAtTime: '140205',
          serviceOrderEventStatus: 'CANCELED',
        },
        product: 'EFR_D1',
        serviceOrderCategory: 'SDI1',
        serviceOrderId: '800008161708',
      },
    ];

    expect(filterActiveServiceOrders(products, serviceOrderEvents)).toEqual(expected);
  });

  it('should also return products when they are not canceled in the service event status', (): void => {
    const products: IProduct[] = [
      {
        docId: null,
        isCanceled: false,
        processedAtDate: '20200620',
        productType: 'EFR_D1',
        serviceDate: '20200630',
      },
      {
        docId: null,
        isCanceled: true,
        processedAtDate: '20200620',
        productType: 'EFR_D1_1',
        serviceDate: '2020-06-22',
      },
      {
        docId: null,
        isCanceled: true,
        processedAtDate: '20200620',
        productType: 'GFR_AS_H',
        serviceDate: '2020-06-22',
      },
    ];

    const serviceOrderEvents: IServiceOrderEvent[] = [
      {
        appointment: {
          date: '20200925',
          slotType: null,
        },
        latestStatus: {
          createdAtDate: '20200922',
          createdAtTime: '140205',
          serviceOrderEventStatus: 'CANCELED',
        },
        product: 'EFR_D1',
        serviceOrderCategory: 'SDI1',
        serviceOrderId: '800008161708',
      },
      {
        appointment: {
          date: '20200925',
          slotType: null,
        },
        latestStatus: {
          createdAtDate: '20200922',
          createdAtTime: '140209',
          serviceOrderEventStatus: 'CANCELED',
        },
        product: 'EFR_D1_1',
        serviceOrderCategory: 'SDI1',
        serviceOrderId: '800008161709',
      },
      {
        appointment: {
          date: '20200925',
          slotType: null,
        },
        latestStatus: {
          createdAtDate: '20200922',
          createdAtTime: '140209',
          serviceOrderEventStatus: 'ON_SCHEDULE',
        },
        product: 'GFR_AS_H',
        serviceOrderCategory: 'SDI1',
        serviceOrderId: '800008161709',
      },
    ];

    const expected: IServiceOrderEvent[] = [
      {
        appointment: {
          date: '20200925',
          slotType: null,
        },
        latestStatus: {
          createdAtDate: '20200922',
          createdAtTime: '140205',
          serviceOrderEventStatus: 'CANCELED',
        },
        product: 'EFR_D1',
        serviceOrderCategory: 'SDI1',
        serviceOrderId: '800008161708',
      },
      {
        appointment: {
          date: '20200925',
          slotType: null,
        },
        latestStatus: {
          createdAtDate: '20200922',
          createdAtTime: '140209',
          serviceOrderEventStatus: 'ON_SCHEDULE',
        },
        product: 'GFR_AS_H',
        serviceOrderCategory: 'SDI1',
        serviceOrderId: '800008161709',
      },
    ];

    expect(filterActiveServiceOrders(products, serviceOrderEvents)).toEqual(expected);
  });
});
