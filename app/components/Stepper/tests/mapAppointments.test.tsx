import React from 'react';
import { IServiceOrderEvent, ServiceOrderEventStatus } from 'types';

import Appointment from '../Appointment';
import AppointmentCallDte from '../AppointmentCallDte';
import AppointmentDelayed from '../AppointmentDelayed';
import AppointmentRescheduled from '../AppointmentRescheduled';
import mapAppointments from '../mapAppointments';

describe('mapAppointments', (): void => {
  const serviceOrderEvents: IServiceOrderEvent[] = [
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

  const serviceOrderEventsStatus = ['DELAYED', 'CALL_DTE', 'RESCHEDULED'];
  const appointments = [
    <AppointmentDelayed
      key ="EFR_D1"
      product="EFR_D1"
      date="20200622"
    />,
    <AppointmentCallDte key="EFR_D1" product="EFR_D1" />,
    <AppointmentRescheduled
      key="EFR_D1"
      product="EFR_D1"
      slotType="AM"
      date="20200622"
    />,
  ];

  it('should return Appointment elements when given an array of service order events', (): void => {
    const expected = [
      <Appointment key="EFR_D1" slotType="AM" product="EFR_D1" />,
      <Appointment key="GCC_GS_1H" slotType="PM" product="GCC_GS_1H" />,
    ];

    expect(mapAppointments(serviceOrderEvents, false)).toStrictEqual(expected);
  });

  serviceOrderEventsStatus.forEach((status: ServiceOrderEventStatus, index: number): void => {
    it(`should return ${status} status component when service order event status is ${status} and us3273 flag is true`, (): void => {
      const serviceOrderEventsSample: IServiceOrderEvent[] = [
        {
          appointment: {
            date: '20200622',
            slotType: 'AM',
          },
          latestStatus: {
            createdAtDate: '20200622',
            createdAtTime: '223443',
            serviceOrderEventStatus: status,
          },
          product: 'EFR_D1',
          serviceOrderCategory: null,
          serviceOrderId: 'abc123',
        },
      ];
      expect(mapAppointments(serviceOrderEventsSample, true)).toStrictEqual([appointments[index]]);
    });
  });
});
