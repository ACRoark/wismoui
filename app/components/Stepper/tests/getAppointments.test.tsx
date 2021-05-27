import React from 'react';
import { IServiceOrderEvent } from 'types';

import Appointment from '../Appointment';
import getAppointments from '../getAppointments';

describe('getAppointments', (): void => {
  it('should hide CanceledCGI appointment when given multiple appointments for that product', (): void => {
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
          createdAtDate: '20200522',
          createdAtTime: '223443',
          serviceOrderEventStatus: 'RESCHEDULED',
        },
        product: 'GCC_GS_1H',
        serviceOrderCategory: null,
        serviceOrderId: 'abc123',
      },
    ];

    expect(getAppointments(serviceOrderEvents, false)).toStrictEqual([
      <Appointment key="EFR_D1" slotType="AM" product="EFR_D1" />,
      <Appointment key="GCC_GS_1H" slotType="PM" product="GCC_GS_1H" />,
    ]);
  });

  it('should show CanceledCGI appointment when there is not another appointment for that product', (): void => {
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

    expect(getAppointments(serviceOrderEvents, false)).toStrictEqual([
      <Appointment key="EFR_D1" slotType="AM" product="EFR_D1" />,
      <Appointment key="GCC_GS_1H" slotType="AM" product="GCC_GS_1H" />,
    ]);
  });
});
