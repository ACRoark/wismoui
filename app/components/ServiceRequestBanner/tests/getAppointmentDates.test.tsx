import { IAppointmentList } from 'types';

import getAppointmentDates from '../getAppointmentDates';

describe('getAppointmentDates', (): void => {
  it('should return all active appointment dates when given multiple appointment dates', (): void => {
    const appointmentList: IAppointmentList[] = [
      {
        appointments: [
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
        ],
        completed: false,
        date: '20200622',
        key: 'EFR_D1',
        showEditLink: false,
      },
      {
        appointments: [
          {
            appointment: {
              date: '20200624',
              slotType: 'AM',
            },
            latestStatus: {
              createdAtDate: '20200622',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'ON_SCHEDULE',
            },
            product: 'GFR_AS_H',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
        ],
        completed: false,
        date: '20200624',
        key: 'GFR_AS_H',
        showEditLink: false,
      },
    ];

    expect(getAppointmentDates(appointmentList)).toStrictEqual(['20200622', '20200624']);
  });

  it('should return only active appointment dates when given multiple appointment dates and one is completed', (): void => {
    const appointmentList: IAppointmentList[] = [
      {
        appointments: [
          {
            appointment: {
              date: '20200622',
              slotType: 'AM',
            },
            latestStatus: {
              createdAtDate: '20200622',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'COMPLETED',
            },
            product: 'EFR_D1',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
        ],
        completed: true,
        date: '20200622',
        key: 'EFR_D1',
        showEditLink: false,
      },
      {
        appointments: [
          {
            appointment: {
              date: '20200624',
              slotType: 'AM',
            },
            latestStatus: {
              createdAtDate: '20200622',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'ON_SCHEDULE',
            },
            product: 'GFR_AS_H',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
        ],
        completed: false,
        date: '20200624',
        key: 'GFR_AS_H',
        showEditLink: false,
      },
    ];

    expect(getAppointmentDates(appointmentList)).toStrictEqual(['20200624']);
  });
});
