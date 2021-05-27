import React from 'react';
import { FormattedMessage } from 'react-intl';
import { IOrderRequest, ServiceOrderEventStatus } from 'types';

import AppointmentList from '../AppointmentList';
import listAppointments from '../listAppointments';
import messages from '../messages';
import { StepperStatus } from '../types';

describe('listAppointments', (): void => {
  it('should return each appointment date and service appointments for that date', (): void => {
    const serviceRequest: IOrderRequest = {
      accountNumber: '001234567890',
      address: {
        city: 'Hobbiton',
        line1: '1 Bagshot Row',
        line2: null,
        state: 'TS',
        zip: '02890',
      },
      contactPhoneNumber: '7348675309',
      orderRequestType: 'MIMO_START',
      orderRequestStatusUpdates: [
        {
          createdAtDate: '20200319',
          createdAtTime: '131530',
          orderRequestStatus: 'REQUESTED',
        },
        {
          createdAtDate: '20200320',
          createdAtTime: '092215',
          orderRequestStatus: 'PROCESSED',
        },
        {
          createdAtDate: '20200321',
          createdAtTime: '223443',
          orderRequestStatus: 'SCHEDULED',
        },
      ],
      premiseId: 'premise123',
      products: [
        {
          docId: null,
          isCanceled: false,
          processedAtDate: '20200620',
          productType: 'EFR_D1',
          serviceDate: '2020-06-30',
        },
        {
          docId: null,
          isCanceled: true,
          processedAtDate: '20200620',
          productType: 'EFR_D1_1',
          serviceDate: '2020-06-22',
        },
      ],
      serviceOrderEvents: [
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
      ],
      verificationEvents:[],
      wantDate:'2021-04-22',
    };

    const expected = {
      description: ([
        <AppointmentList
          appointments={[serviceRequest.serviceOrderEvents[0]]}
          completed={false}
          date="20200622"
          key="EFR_D1"
          showEditLink={false}
        />,
        <AppointmentList
          appointments={[serviceRequest.serviceOrderEvents[1]]}
          completed={false}
          date="20200627"
          key="GCC_GS_1H"
          showEditLink={false}
        />,
      ]),
      key: 'Scheduled',
      status: StepperStatus.Completed,
      title: <FormattedMessage {...messages.scheduled} />,
    };

    expect(listAppointments(serviceRequest)).toEqual(expected);
  });

  it('should return one appointment date when given one service date', (): void => {
    const serviceRequest: IOrderRequest = {
      accountNumber: '001234567890',
      address: {
        city: 'Hobbiton',
        line1: '1 Bagshot Row',
        line2: null,
        state: 'TS',
        zip: '02890',
      },
      contactPhoneNumber: '7348675309',
      orderRequestType: 'MIMO_START',
      orderRequestStatusUpdates: [
        {
          createdAtDate: '20200319',
          createdAtTime: '131530',
          orderRequestStatus: 'REQUESTED',
        },
        {
          createdAtDate: '20200320',
          createdAtTime: '092215',
          orderRequestStatus: 'PROCESSED',
        },
        {
          createdAtDate: '20200321',
          createdAtTime: '223443',
          orderRequestStatus: 'SCHEDULED',
        },
      ],
      premiseId: 'premise123',
      products: [
        {
          docId: null,
          isCanceled: false,
          processedAtDate: '20200620',
          productType: 'EFR_D1',
          serviceDate: '2020-06-30',
        },
        {
          docId: null,
          isCanceled: true,
          processedAtDate: '20200620',
          productType: 'EFR_D1_1',
          serviceDate: '2020-06-22',
        },
      ],
      serviceOrderEvents: [
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
      verificationEvents:[],
      wantDate:'2021-04-22',
    };

    const expected = {
      description: ([
        <AppointmentList
          appointments={[serviceRequest.serviceOrderEvents[0]]}
          completed={false}
          date="20200622"
          key="EFR_D1"
          showEditLink
        />,
      ]),
      key: 'Scheduled',
      status: StepperStatus.Completed,
      title: <FormattedMessage {...messages.scheduled} />,
    };

    expect(listAppointments(serviceRequest)).toEqual(expected);
  });

  it('should return the scheduled step with an error status when one of the appointments is associated with DELAYED or CALL_DTE status', (): void => {
    ['CALL_DTE', 'DELAYED'].forEach((status: ServiceOrderEventStatus): void => {
      const serviceRequest: IOrderRequest = {
        accountNumber: '001234567890',
        address: {
          city: 'Hobbiton',
          line1: '1 Bagshot Row',
          line2: null,
          state: 'TS',
          zip: '02890',
        },
        contactPhoneNumber: '7348675309',
        orderRequestType: 'MIMO_START',
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200319',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200320',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
          {
            createdAtDate: '20200321',
            createdAtTime: '223443',
            orderRequestStatus: 'SCHEDULED',
          },
        ],
        premiseId: 'premise123',
        products: [
          {
            docId: null,
            isCanceled: false,
            processedAtDate: '20200620',
            productType: 'EFR_D1',
            serviceDate: '2020-06-30',
          },
          {
            docId: null,
            isCanceled: true,
            processedAtDate: '20200620',
            productType: 'EFR_D1_1',
            serviceDate: '2020-06-22',
          },
        ],
        serviceOrderEvents: [
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
        ],
        verificationEvents:[],
        wantDate:'2021-04-22',
      };

      const expected = {
        description: ([
          <AppointmentList
            appointments={[serviceRequest.serviceOrderEvents[0]]}
            completed={false}
            date="20200622"
            key="EFR_D1"
            showEditLink
          />,
        ]),
        key: 'Scheduled',
        status: StepperStatus.Error,
        title: <FormattedMessage {...messages.scheduled} />,
      };

      expect(listAppointments(serviceRequest)).toEqual(expected);
    });
  });
});
