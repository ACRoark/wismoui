import { IServiceOrderEvent } from 'types';

import groupByDate from '../groupByDate';

describe('groupByDate', (): void => {
  it('should return an array of one service when given one service order', (): void => {
    const serviceOrderEvents: IServiceOrderEvent[] = [
      {
        appointment: {
          date: '2020-06-23',
          slotType: 'AM',
        },
        latestStatus: {
          createdAtDate: '20200622',
          createdAtTime: '223443',
          serviceOrderEventStatus: 'ON_SCHEDULE',
        },
        product: 'EFR_D1',
        serviceOrderCategory: null,
        serviceOrderId: 'abc123',
      },
    ];

    const expected: IServiceOrderEvent[][] = [
      [
        {
          appointment: {
            date: '2020-06-23',
            slotType: 'AM',
          },
          latestStatus: {
            createdAtDate: '20200622',
            createdAtTime: '223443',
            serviceOrderEventStatus: 'ON_SCHEDULE',
          },
          product: 'EFR_D1',
          serviceOrderCategory: null,
          serviceOrderId: 'abc123',
        },
      ],
    ];

    expect(groupByDate(serviceOrderEvents)).toStrictEqual(expected);
  });

  it('should return multiple arrays when given serviceOrderEvents on different dates', (): void => {
    const serviceOrderEvents: IServiceOrderEvent[] = [
      {
        appointment: {
          date: '2020-06-23',
          slotType: 'AM',
        },
        latestStatus: {
          createdAtDate: '20200622',
          createdAtTime: '223443',
          serviceOrderEventStatus: 'ON_SCHEDULE',
        },
        product: 'EFR_D1',
        serviceOrderCategory: null,
        serviceOrderId: 'abc123',
      },
      {
        appointment: {
          date: '2020-06-24',
          slotType: 'PM',
        },
        latestStatus: {
          createdAtDate: '20200622',
          createdAtTime: '223443',
          serviceOrderEventStatus: 'ON_SCHEDULE',
        },
        product: 'GCC_GS_1H',
        serviceOrderCategory: null,
        serviceOrderId: 'abc123',
      },
    ];

    const expected: IServiceOrderEvent[][] = [
      [
        {
          appointment: {
            date: '2020-06-23',
            slotType: 'AM',
          },
          latestStatus: {
            createdAtDate: '20200622',
            createdAtTime: '223443',
            serviceOrderEventStatus: 'ON_SCHEDULE',
          },
          product: 'EFR_D1',
          serviceOrderCategory: null,
          serviceOrderId: 'abc123',
        },
      ],
      [
        {
          appointment: {
            date: '2020-06-24',
            slotType: 'PM',
          },
          latestStatus: {
            createdAtDate: '20200622',
            createdAtTime: '223443',
            serviceOrderEventStatus: 'ON_SCHEDULE',
          },
          product: 'GCC_GS_1H',
          serviceOrderCategory: null,
          serviceOrderId: 'abc123',
        },
      ],
    ];

    expect(groupByDate(serviceOrderEvents)).toStrictEqual(expected);
  });

  it('should return multiple arrays when given serviceOrderEvents on different dates with multiple service order events for each date', (): void => {
    const serviceOrderEvents: IServiceOrderEvent[] = [
      {
        appointment: {
          date: '2020-06-23',
          slotType: 'AM',
        },
        latestStatus: {
          createdAtDate: '20200622',
          createdAtTime: '223443',
          serviceOrderEventStatus: 'ON_SCHEDULE',
        },
        product: 'EFR_D1',
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
          serviceOrderEventStatus: 'ON_SCHEDULE',
        },
        product: 'GFR_2A2_NH',
        serviceOrderCategory: null,
        serviceOrderId: 'abc123',
      },
      {
        appointment: {
          date: '2020-06-24',
          slotType: 'PM',
        },
        latestStatus: {
          createdAtDate: '20200622',
          createdAtTime: '223443',
          serviceOrderEventStatus: 'ON_SCHEDULE',
        },
        product: 'GCC_GS_1H',
        serviceOrderCategory: null,
        serviceOrderId: 'abc123',
      },
    ];

    const expected: IServiceOrderEvent[][] = [
      [
        {
          appointment: {
            date: '2020-06-23',
            slotType: 'AM',
          },
          latestStatus: {
            createdAtDate: '20200622',
            createdAtTime: '223443',
            serviceOrderEventStatus: 'ON_SCHEDULE',
          },
          product: 'EFR_D1',
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
            serviceOrderEventStatus: 'ON_SCHEDULE',
          },
          product: 'GFR_2A2_NH',
          serviceOrderCategory: null,
          serviceOrderId: 'abc123',
        },
      ],
      [
        {
          appointment: {
            date: '2020-06-24',
            slotType: 'PM',
          },
          latestStatus: {
            createdAtDate: '20200622',
            createdAtTime: '223443',
            serviceOrderEventStatus: 'ON_SCHEDULE',
          },
          product: 'GCC_GS_1H',
          serviceOrderCategory: null,
          serviceOrderId: 'abc123',
        },
      ],
    ];

    expect(groupByDate(serviceOrderEvents)).toStrictEqual(expected);
  });
});
