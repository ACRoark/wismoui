import { IAppointmentList, IOrderRequest } from 'types';
import createAppointmentList from '../createAppointmentList';

describe('createAppointmentList', (): void => {
  const baseServiceRequest: IOrderRequest = {
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
    products: [],
    serviceOrderEvents: [],
    verificationEvents:[],
    wantDate:'2021-04-22',
  };

  // tslint:disable-next-line: max-line-length
  it('should return an appointment list that returns each date and the appointments for that date when given multiple appointments on different dates', (): void => {
    const serviceRequest: IOrderRequest = {
      ...baseServiceRequest,
      products: [
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
          productType: 'ECC_D3_2',
          serviceDate: '20200630',
        },
        {
          docId: null,
          isCanceled: false,
          processedAtDate: '20200620',
          productType: 'GFR_AS_H',
          serviceDate: '20200630',
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
            date: '20200622',
            slotType: 'AM',
          },
          latestStatus: {
            createdAtDate: '20200622',
            createdAtTime: '223443',
            serviceOrderEventStatus: 'ON_SCHEDULE',
          },
          product: 'ECC_D3_2',
          serviceOrderCategory: null,
          serviceOrderId: 'abc123',
        },
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
    };

    const expected: IAppointmentList[] = [
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
            product: 'ECC_D3_2',
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

    expect(createAppointmentList(serviceRequest)).toEqual(expected);
  });

  // tslint:disable-next-line: max-line-length
  it('should return an appointment list where the date matches the product service date when given a canceled service appointment that has an active product', (): void => {
    const serviceRequest: IOrderRequest = {
      ...baseServiceRequest,
      products: [
        {
          docId: null,
          isCanceled: false,
          processedAtDate: '20200620',
          productType: 'EFR_D1',
          serviceDate: '20200630',
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
            serviceOrderEventStatus: 'CANCELED',
          },
          product: 'EFR_D1',
          serviceOrderCategory: null,
          serviceOrderId: 'abc123',
        },
      ],
    };

    const expected: IAppointmentList[] = [
      {
        appointments: [
          {
            appointment: {
              date: '20200630',
              slotType: 'AM',
            },
            latestStatus: {
              createdAtDate: '20200622',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'CANCELED',
            },
            product: 'EFR_D1',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
        ],
        completed: false,
        date: '20200630',
        key: 'EFR_D1',
        showEditLink: true,
      },
    ];

    expect(createAppointmentList(serviceRequest)).toEqual(expected);
  });

  it('should return an appointment list where the completed service orders are come first', (): void => {
    const serviceRequest: IOrderRequest = {
      ...baseServiceRequest,
      products: [
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
          productType: 'GCC_GS_1H',
          serviceDate: '20200630',
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
            date: '20200622',
            slotType: 'AM',
          },
          latestStatus: {
            createdAtDate: '20200622',
            createdAtTime: '223443',
            serviceOrderEventStatus: 'COMPLETED',
          },
          product: 'GCC_GS_1H',
          serviceOrderCategory: null,
          serviceOrderId: 'abc123',
        },
      ],
    };

    const expected: IAppointmentList[] = [
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
            product: 'GCC_GS_1H',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
        ],
        completed: true,
        date: '20200622',
        key: 'GCC_GS_1H',
        showEditLink: true,
      },
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
        showEditLink: true,
      },
    ];

    expect(createAppointmentList(serviceRequest)).toEqual(expected);
  });
});
