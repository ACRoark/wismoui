import IServiceOrderEvent from 'types/IServiceOrderEvent';
import sortByAppointmentTime from '../sortByAppointmentTime';

describe('sortByAppointmentTime', (): void => {
  const serviceOrderEventAM: IServiceOrderEvent = {
    appointment: {
      date: '2020-04-17',
      slotType: 'AM',
    },
    latestStatus: {
      createdAtDate: '20200319',
      createdAtTime: '164530',
      serviceOrderEventStatus: 'ON_SCHEDULE',
    },
    product: 'GFR_A_L',
    serviceOrderCategory: null,
    serviceOrderId: '1234567890',
  };

  it('should sort service orders by their appointment time in ascending order and an anytime appointment would be last', (): void => {
    const serviceOrderEvents: IServiceOrderEvent[] = [
      {
        ...serviceOrderEventAM,
        appointment: {
          date: '2020-04-17',
          slotType: 'AN',
        },
      },
      {
        ...serviceOrderEventAM,
        appointment: {
          date: '2020-04-17',
          slotType: 'AH',
        },
      },
      {
        ...serviceOrderEventAM,
        appointment: {
          date: '2020-04-17',
          slotType: 'PM',
        },
      },
      serviceOrderEventAM,
    ];

    const expected: IServiceOrderEvent[] = [
      serviceOrderEventAM,
      {
        ...serviceOrderEventAM,
        appointment: {
          date: '2020-04-17',
          slotType: 'PM',
        },
      },
      {
        ...serviceOrderEventAM,
        appointment: {
          date: '2020-04-17',
          slotType: 'AH',
        },
      },
      {
        ...serviceOrderEventAM,
        appointment: {
          date: '2020-04-17',
          slotType: 'AN',
        },
      },
    ];

    expect(sortByAppointmentTime(serviceOrderEvents)).toEqual(expected);
  });

  it('should sort service orders by their appointment time in ascending order and null appointment slot would be last', (): void => {
    const serviceOrderEvents: IServiceOrderEvent[] = [
      {
        ...serviceOrderEventAM,
        appointment: {
          date: '2020-04-17',
          slotType: null,
        },
      },
      {
        ...serviceOrderEventAM,
        appointment: {
          date: '2020-04-17',
          slotType: 'AH',
        },
      },
      {
        ...serviceOrderEventAM,
        appointment: {
          date: '2020-04-17',
          slotType: 'AN',
        },
      },
      serviceOrderEventAM,
    ];

    const expected: IServiceOrderEvent[] = [
      serviceOrderEventAM,
      {
        ...serviceOrderEventAM,
        appointment: {
          date: '2020-04-17',
          slotType: 'AH',
        },
      },
      {
        ...serviceOrderEventAM,
        appointment: {
          date: '2020-04-17',
          slotType: 'AN',
        },
      },
      {
        ...serviceOrderEventAM,
        appointment: {
          date: '2020-04-17',
          slotType: null,
        },
      },
    ];

    expect(sortByAppointmentTime(serviceOrderEvents)).toEqual(expected);
  });
});
