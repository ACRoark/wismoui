import { IServiceOrderEvent } from 'types';

import sortByAppointmentDate from '../sortByAppointmentDate';

describe('sortByAppointmentDate', (): void => {
  it('should return the same order of serviceOrderEvents when they are the same date', (): void => {
    const serviceOrderEvents: IServiceOrderEvent[] = [
      {
        appointment: {
          date: '20200622',
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
      {
        appointment: {
          date: '20200622',
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

    expect(sortByAppointmentDate(serviceOrderEvents)).toStrictEqual(serviceOrderEvents);
  });

  it('should order serviceOrderEvents by appointment date', (): void => {
    const serviceOrderEvents: IServiceOrderEvent[] = [
      {
        appointment: {
          date: '20200627',
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
      {
        appointment: {
          date: '20200622',
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

    const expected: IServiceOrderEvent[] = [
      {
        appointment: {
          date: '20200622',
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
          date: '20200627',
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

    expect(sortByAppointmentDate(serviceOrderEvents)).toStrictEqual(expected);
  });
});
