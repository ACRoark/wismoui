import { IProduct, IServiceOrderEvent } from 'types';

import updateServiceOrdersDate from '../updateServiceOrdersDate';

describe('updateServiceOrdersDate', (): void => {
  it('should return the product service date instead of the service appointment date when given a canceled service order but active product', (): void => {
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
        isCanceled: false,
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
          date: '20200630',
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

    expect(updateServiceOrdersDate(products, serviceOrderEvents)).toEqual(expected);
  });

  it('should return the service order appointment date when the service orders are canceled and the product is canceled', (): void => {
    const products: IProduct[] = [
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
          createdAtTime: '140209',
          serviceOrderEventStatus: 'CANCELED',
        },
        product: 'GFR_AS_H',
        serviceOrderCategory: 'SDI1',
        serviceOrderId: '800008161709',
      },
    ];

    expect(updateServiceOrdersDate(products, serviceOrderEvents)).toEqual(expected);
  });

  it('should return the same service order appointment date when the service orders are NOT canceled', (): void => {
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
        isCanceled: false,
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
          serviceOrderEventStatus: 'ON_SCHEDULE',
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

    const expected: IServiceOrderEvent[] = [
      {
        appointment: {
          date: '20200925',
          slotType: null,
        },
        latestStatus: {
          createdAtDate: '20200922',
          createdAtTime: '140205',
          serviceOrderEventStatus: 'ON_SCHEDULE',
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

    expect(updateServiceOrdersDate(products, serviceOrderEvents)).toEqual(expected);
  });
});
