import IOrder from 'types/IOrder';
import IOrderRequest from 'types/IOrderRequest';
import OrderType from 'types/OrderType';

const MIMO_START_TEMPLATE: IOrder = {
  closedDetails: null,
  createdAt: '2020-05-19T13:15:30Z',
  createdBy: 'WEB',
  customer: {
    bpId: 'bp123',
    name: 'Frodo Baggins',
  },
  orderNumber: 'MI12345678',
  orderRequests: [
    {
      accountNumber: '123456789',
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
          createdAtDate: '20200519',
          createdAtTime: '131530',
          orderRequestStatus: 'REQUESTED',
        },
      ],
      premiseId: 'premise123',
      products: [
        {
          productType: 'EFR_D1',
          serviceDate: '2020-06-22',
        },
      ],
      serviceOrderEvents: [],
      verificationEvents: [],
      wantDate: '2020-06-22',
    },
  ],
  orderType: 'MIMO_START',
};

const fakeOrders: IOrder[] = [
  // OrderType: MIMO_START, Scenario 1 - Requested
  MIMO_START_TEMPLATE,
  // OrderType: MIMO_START, Scenario 2 - Processed
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MI23456789',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
      },
    ],
  },
  // OrderType: MIMO_START, Scenario 2 - Needs Verification
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MI89012345',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200519',
            createdAtTime: '161530',
            orderRequestStatus: 'NEEDS_VERIFICATION',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'ACTIVE',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200521',
                createdAtTime: '092215',
              },
              {
                verificationCode: 'PR',
                verificationEventStatus: 'ACTIVE',
                createdAtDate: '20200521',
                createdAtTime: '112215',
              },
              {
                verificationCode: 'PR',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200521',
                createdAtTime: '122215',
              },
              {
                verificationCode: 'DR',
                verificationEventStatus: 'ACTIVE',
                createdAtDate: '20200522',
                createdAtTime: '092215',
              },
              {
                verificationCode: 'DR',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200522',
                createdAtTime: '123015',
              },
              {
                verificationCode: 'PR',
                verificationEventStatus: 'ACTIVE',
                createdAtDate: '20200523',
                createdAtTime: '092215',
              },
            ],
          },
        ],
      },
    ],
  },
  // OrderType: MIMO_START, Scenario 2 - Needs Verification, with most recent Verification Event ACTIVE
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MI90123456',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200519',
            createdAtTime: '161530',
            orderRequestStatus: 'NEEDS_VERIFICATION',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'ACTIVE',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200521',
                createdAtTime: '092215',
              },
              {
                verificationCode: 'PR',
                verificationEventStatus: 'ACTIVE',
                createdAtDate: '20200521',
                createdAtTime: '112215',
              },
              {
                verificationCode: 'PR',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200521',
                createdAtTime: '122215',
              },
              {
                verificationCode: 'DR',
                verificationEventStatus: 'ACTIVE',
                createdAtDate: '20200522',
                createdAtTime: '092215',
              },
              {
                verificationCode: 'DR',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200522',
                createdAtTime: '123015',
              },
              {
                verificationCode: 'PR',
                verificationEventStatus: 'ACTIVE',
                createdAtDate: '20200523',
                createdAtTime: '092215',
              },
            ],
          },
        ],
      },
    ],
  },
  // OrderType: MIMO_START, Scenario 3 - Scheduled (AMI)
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MI90123456',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200519',
            createdAtTime: '161530',
            orderRequestStatus: 'NEEDS_VERIFICATION',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'ACTIVE',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200521',
                createdAtTime: '092215',
              },
              {
                verificationCode: 'PR',
                verificationEventStatus: 'ACTIVE',
                createdAtDate: '20200521',
                createdAtTime: '112215',
              },
              {
                verificationCode: 'PR',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200521',
                createdAtTime: '122215',
              },
              {
                verificationCode: 'DR',
                verificationEventStatus: 'ACTIVE',
                createdAtDate: '20200522',
                createdAtTime: '092215',
              },
              {
                verificationCode: 'DR',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200522',
                createdAtTime: '123015',
              },
              {
                verificationCode: 'PR',
                verificationEventStatus: 'ACTIVE',
                createdAtDate: '20200523',
                createdAtTime: '092215',
              },
            ],
          },
        ],
      },
    ],
  },
  // OrderType: MIMO_START, Scenario 3 - Scheduled (AMI), with BPEM AP-R975
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MI34567899',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
        ],
        serviceOrderEvents: [],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AP',
                verificationEventStatus: 'ACTIVE',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
      },
    ],
  },
  // OrderType: MIMO_START, Scenario 3 - Scheduled (AMI), with BPEM PM-R984
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MI45678900',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
        ],
        serviceOrderEvents: [],
        verificationEvents: [
          {
            verificationCategory: 'R984',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'PM',
                verificationEventStatus: 'ACTIVE',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
      },
    ],
  },
  // OrderType: MIMO_START, Scenario 3 - Scheduled (AMI), with BPEM WP-R984
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MI56789011',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
        ],
        serviceOrderEvents: [],
        verificationEvents: [
          {
            verificationCategory: 'R984',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'WP',
                verificationEventStatus: 'ACTIVE',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
      },
    ],
  },
  // OrderType: MIMO_START, Scenario 4 - Scheduled (non-AMI)
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MI45678901',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
          {
            createdAtDate: '20200521',
            createdAtTime: '223443',
            orderRequestStatus: 'SCHEDULED',
          },
        ],
        serviceOrderEvents: [
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
              slotType: 'PM',
            },
            latestStatus: {
              createdAtDate: '20200522',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'COMPLETED',
            },
            product: 'GCC_GS_1H',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
      },
    ],
  },
  // OrderType: MIMO_START, Scenario 5 - Awaiting Billing
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MI67890123',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
          {
            createdAtDate: '20200521',
            createdAtTime: '223443',
            orderRequestStatus: 'SCHEDULED',
          },
          {
            createdAtDate: '20200523',
            createdAtTime: '223443',
            orderRequestStatus: 'AWAITING_BILLING',
          },
        ],
        serviceOrderEvents: [
          {
            appointment: {
              date: '2020-05-22',
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
              date: '2020-05-22',
              slotType: 'PM',
            },
            latestStatus: {
              createdAtDate: '20200522',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'COMPLETED',
            },
            product: 'GCC_GS_1H',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
        wantDate: '2020-05-22',
      },
    ],
  },
  // OrderType: MIMO_START, Scenario 6 - Completed
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MI78901234',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
          {
            createdAtDate: '20200521',
            createdAtTime: '223443',
            orderRequestStatus: 'SCHEDULED',
          },
          {
            createdAtDate: '20200523',
            createdAtTime: '223443',
            orderRequestStatus: 'AWAITING_BILLING',
          },
          {
            createdAtDate: '20200525',
            createdAtTime: '223443',
            orderRequestStatus: 'COMPLETED',
          },
        ],
        serviceOrderEvents: [
          {
            appointment: {
              date: '2020-05-22',
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
              date: '2020-05-22',
              slotType: 'PM',
            },
            latestStatus: {
              createdAtDate: '20200522',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'COMPLETED',
            },
            product: 'GCC_GS_1H',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
        wantDate: '2020-05-22',
      },
    ],
  },
  // OrderType: MIMO_START, Scenario 6 - Completed, CANCELED_CGI
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MI01234566',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
          {
            createdAtDate: '20200521',
            createdAtTime: '223443',
            orderRequestStatus: 'SCHEDULED',
          },
          {
            createdAtDate: '20200523',
            createdAtTime: '223443',
            orderRequestStatus: 'AWAITING_BILLING',
          },
          {
            createdAtDate: '20200525',
            createdAtTime: '223443',
            orderRequestStatus: 'CANCELED',
          },
        ],
        serviceOrderEvents: [
          {
            appointment: {
              date: '2020-05-22',
              slotType: 'AM',
            },
            latestStatus: {
              createdAtDate: '20200522',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'CANCELED_CGI',
            },
            product: 'EFR_D1',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
          {
            appointment: {
              date: '2020-05-22',
              slotType: 'PM',
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
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
        wantDate: '2020-05-22',
      },
    ],
  },
  // OrderType: MIMO_START, Scenario 6 - Completed, CANCELED_INC
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MI12345677',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
          {
            createdAtDate: '20200521',
            createdAtTime: '223443',
            orderRequestStatus: 'SCHEDULED',
          },
          {
            createdAtDate: '20200523',
            createdAtTime: '223443',
            orderRequestStatus: 'AWAITING_BILLING',
          },
          {
            createdAtDate: '20200525',
            createdAtTime: '223443',
            orderRequestStatus: 'CANCELED',
          },
        ],
        serviceOrderEvents: [
          {
            appointment: {
              date: '2020-05-22',
              slotType: 'AM',
            },
            latestStatus: {
              createdAtDate: '20200522',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'CANCELED_INC',
            },
            product: 'EFR_D1',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
          {
            appointment: {
              date: '2020-05-22',
              slotType: 'PM',
            },
            latestStatus: {
              createdAtDate: '20200522',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'CANCELED_INC',
            },
            product: 'GCC_GS_1H',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
        wantDate: '2020-05-22',
      },
    ],
  },
  // OrderType: MIMO_START, Scenario 6 - Completed, CANCELED
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MI23456788',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
          {
            createdAtDate: '20200521',
            createdAtTime: '223443',
            orderRequestStatus: 'SCHEDULED',
          },
          {
            createdAtDate: '20200523',
            createdAtTime: '223443',
            orderRequestStatus: 'AWAITING_BILLING',
          },
          {
            createdAtDate: '20200525',
            createdAtTime: '223443',
            orderRequestStatus: 'CANCELED',
          },
        ],
        serviceOrderEvents: [
          {
            appointment: {
              date: '2020-05-22',
              slotType: 'AM',
            },
            latestStatus: {
              createdAtDate: '20200522',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'CANCELED',
            },
            product: 'EFR_D1',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
          {
            appointment: {
              date: '2020-05-22',
              slotType: 'PM',
            },
            latestStatus: {
              createdAtDate: '20200522',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'CANCELED',
            },
            product: 'GCC_GS_1H',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
        wantDate: '2020-05-22',
      },
    ],
  },
  // OrderType: MIMO_START, Closed Order Abandoned
  {
    closedDetails: {
      closedAt: '2020-05-21T01:36:12.278322Z',
      reason: 'ABANDONED',
    },
    createdAt: '2020-04-19T13:15:30Z',
    createdBy: 'WEB',
    customer: {
      bpId: 'bp123',
      name: 'Frodo Baggins',
    },
    orderNumber: 'MI44444444',
    orderRequests: [
      {
        accountNumber: '123456789',
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
            createdAtDate: '20200419',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200420',
            createdAtTime: '131530',
            orderRequestStatus: 'CANCELED',
          },
        ],
        premiseId: 'premise123',
        products: [
          {
            productType: 'EFR_D1',
            serviceDate: '2020-06-22',
          },
        ],
        serviceOrderEvents: [],
        verificationEvents: [],
        wantDate: '2020-06-22',
      },
    ],
    orderType: 'MIMO_START',
  },
  // OrderType: MIMO_START, Cancelled order, hasn't been abandoned yet
  {
    ...MIMO_START_TEMPLATE,
    closedDetails: {
      closedAt: '2020-05-21T01:36:12.278322Z',
      reason: 'CANCELED',
    },
    orderNumber: 'MI55555555',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
          {
            createdAtDate: '20200521',
            createdAtTime: '092215',
            orderRequestStatus: 'CANCELED',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
      },
    ],
  },
  // OrderType: MIMO_STOP, Scenario 1 - Requested
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MO12345678',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestType: 'MIMO_STOP',
      },
    ],
    orderType: 'MIMO_STOP',
  },
  // OrderType: MIMO_STOP, Scenario 2 - Processed
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MO23456789',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestType: 'MIMO_STOP',
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
      },
    ],
    orderType: 'MIMO_STOP',
  },
  // OrderType: MIMO_STOP, Scenario 2 - Needs Verification
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MO89012345',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestType: 'MIMO_STOP',
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'NEEDS_VERIFICATION',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'ACTIVE',
                createdAtDate: '20200520',
                createdAtTime: '102215',
              },
            ],
          },
        ],
      },
    ],
    orderType: 'MIMO_STOP',
  },
  // OrderType: MIMO_STOP, Scenario 3 - Scheduled (delayed)
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MO34567890',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestType: 'MIMO_STOP',
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
          {
            createdAtDate: '20200521',
            createdAtTime: '223443',
            orderRequestStatus: 'SCHEDULED',
          },
        ],
        serviceOrderEvents: [
          {
            appointment: {
              date: '2020-06-22',
              slotType: 'AN',
            },
            latestStatus: {
              createdAtDate: '20200521',
              createdAtTime: '223441',
              serviceOrderEventStatus: 'ON_SCHEDULE',
            },
            product: 'EFR_D1',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
          {
            appointment: {
              date: '2020-06-22',
              slotType: 'AN',
            },
            latestStatus: {
              createdAtDate: '20200522',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'DELAYED',
            },
            product: 'EFR_D1',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
      },
    ],
    orderType: 'MIMO_STOP',
  },
  // OrderType: MIMO_STOP, Scenario 4 - Scheduled (call dte)
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MO45678901',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestType: 'MIMO_STOP',
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
          {
            createdAtDate: '20200521',
            createdAtTime: '223443',
            orderRequestStatus: 'SCHEDULED',
          },
        ],
        serviceOrderEvents: [
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
              slotType: 'PM',
            },
            latestStatus: {
              createdAtDate: '20200522',
              createdAtTime: '223444',
              serviceOrderEventStatus: 'CALL_DTE',
            },
            product: 'GCC_GS_1H',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
      },
    ],
    orderType: 'MIMO_STOP',
  },
  // OrderType: MIMO_STOP, Scenario 5 - scheduled(rescheduled)
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MO56789012',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestType: 'MIMO_STOP',
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200619',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200620',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
          {
            createdAtDate: '20200621',
            createdAtTime: '223443',
            orderRequestStatus: 'SCHEDULED',
          },
        ],
        serviceOrderEvents: [
          {
            appointment: {
              date: '2020-06-22',
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
          {
            appointment: {
              date: '2020-05-22',
              slotType: 'PM',
            },
            product: 'GCC_GS_1H',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
            latestStatus: {
              createdAtDate: '20200622',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'RESCHEDULED',
            },
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200620',
                createdAtTime: '092215',
              },
            ],
          },
        ],
        wantDate: '2020-06-22',
      },
    ],
    orderType: 'MIMO_STOP',
  },

  // OrderType: MIMO_STOP, Scenario 6 - scheduled (partial completion)
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MO67890123',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestType: 'MIMO_STOP',
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
          {
            createdAtDate: '20200521',
            createdAtTime: '223443',
            orderRequestStatus: 'SCHEDULED',
          },
        ],
        serviceOrderEvents: [
          {
            appointment: {
              date: '2020-05-22',
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
              date: '2020-05-22',
              slotType: 'PM',
            },
            latestStatus: {
              createdAtDate: '20200522',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'PARTIAL_COMPLETION',
            },
            product: 'GCC_GS_1H',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
        wantDate: '2020-06-22',
      },
    ],
    orderType: 'MIMO_STOP',
  },
  // OrderType: MIMO_TRANSFER, Scenario 1 - Requested/Requested
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MT12345678',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestType: 'MIMO_START',
      },
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestType: 'MIMO_STOP',
      },
    ],
    orderType: 'MIMO_TRANSFER',
  },
  // OrderType: MIMO_TRANSFER, Scenario 2 - Processed/Processed
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MT23456789',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestType: 'MIMO_START',
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
      },
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestType: 'MIMO_STOP',
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
      },
    ],
    orderType: 'MIMO_TRANSFER',
  },
  // OrderType: MIMO_TRANSFER, Scenario 3 - Scheduled (AMI)/Scheduled (AMI)
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MT34567890',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestType: 'MIMO_START',
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
          {
            createdAtDate: '20200521',
            createdAtTime: '223443',
            orderRequestStatus: 'SCHEDULED',
          },
        ],
        serviceOrderEvents: [
          {
            appointment: {
              date: '2020-06-22',
              slotType: 'AN',
            },
            product: 'EFR_D1',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
            latestStatus: {
              createdAtDate: '20200521',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'ON_SCHEDULE',
            },
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
      },
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestType: 'MIMO_STOP',
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
          {
            createdAtDate: '20200521',
            createdAtTime: '223443',
            orderRequestStatus: 'SCHEDULED',
          },
        ],
        serviceOrderEvents: [
          {
            appointment: {
              date: '2020-06-22',
              slotType: 'AN',
            },
            latestStatus: {
              createdAtDate: '20200521',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'ON_SCHEDULE',
            },
            product: 'EFR_D1',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
      },
    ],
    orderType: 'MIMO_TRANSFER',
  },
  // OrderType: MIMO_TRANSFER, Scenario 4 - Scheduled (non-AMI)/Scheduled (non-AMI)
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MT45678901',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestType: 'MIMO_START',
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
          {
            createdAtDate: '20200521',
            createdAtTime: '223443',
            orderRequestStatus: 'SCHEDULED',
          },
        ],
        serviceOrderEvents: [
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
              slotType: 'PM',
            },
            latestStatus: {
              createdAtDate: '20200522',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'COMPLETED',
            },
            product: 'GCC_GS_1H',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
      },
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestType: 'MIMO_STOP',
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
          {
            createdAtDate: '20200521',
            createdAtTime: '223443',
            orderRequestStatus: 'SCHEDULED',
          },
        ],
        serviceOrderEvents: [
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
              slotType: 'PM',
            },
            latestStatus: {
              createdAtDate: '20200522',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'COMPLETED',
            },
            product: 'GCC_GS_1H',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
      },
    ],
    orderType: 'MIMO_TRANSFER',
  },
  // OrderType: MIMO_TRANSFER, Scenario 5 - Awaiting Billing/Awaiting Billing
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MT56789012',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestType: 'MIMO_START',
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
          {
            createdAtDate: '20200521',
            createdAtTime: '223443',
            orderRequestStatus: 'SCHEDULED',
          },
          {
            createdAtDate: '20200524',
            createdAtTime: '223443',
            orderRequestStatus: 'AWAITING_BILLING',
          },
        ],
        serviceOrderEvents: [
          {
            appointment: {
              date: '2020-05-22',
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
              date: '2020-05-22',
              slotType: 'PM',
            },
            latestStatus: {
              createdAtDate: '20200522',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'COMPLETED',
            },
            product: 'GCC_GS_1H',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
      },
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestType: 'MIMO_STOP',
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
          {
            createdAtDate: '20200521',
            createdAtTime: '223443',
            orderRequestStatus: 'SCHEDULED',
          },
          {
            createdAtDate: '20200524',
            createdAtTime: '223443',
            orderRequestStatus: 'AWAITING_BILLING',
          },
        ],
        serviceOrderEvents: [
          {
            appointment: {
              date: '2020-05-22',
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
              date: '2020-05-22',
              slotType: 'PM',
            },
            latestStatus: {
              createdAtDate: '20200522',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'COMPLETED',
            },
            product: 'GCC_GS_1H',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
      },
    ],
    orderType: 'MIMO_TRANSFER',
  },
  // OrderType: MIMO_TRANSFER, Scenario 6 - Completed/Completed
  {
    ...MIMO_START_TEMPLATE,
    orderNumber: 'MT67890123',
    orderRequests: [
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestType: 'MIMO_START',
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
          {
            createdAtDate: '20200521',
            createdAtTime: '223443',
            orderRequestStatus: 'SCHEDULED',
          },
          {
            createdAtDate: '20200623',
            createdAtTime: '223443',
            orderRequestStatus: 'AWAITING_BILLING',
          },
          {
            createdAtDate: '20200525',
            createdAtTime: '223443',
            orderRequestStatus: 'COMPLETED',
          },
        ],
        serviceOrderEvents: [
          {
            appointment: {
              date: '2020-05-22',
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
              date: '2020-05-22',
              slotType: 'PM',
            },
            latestStatus: {
              createdAtDate: '20200522',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'COMPLETED',
            },
            product: 'GCC_GS_1H',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
      },
      {
        ...MIMO_START_TEMPLATE.orderRequests[0],
        orderRequestType: 'MIMO_STOP',
        orderRequestStatusUpdates: [
          {
            createdAtDate: '20200519',
            createdAtTime: '131530',
            orderRequestStatus: 'REQUESTED',
          },
          {
            createdAtDate: '20200520',
            createdAtTime: '092215',
            orderRequestStatus: 'PROCESSED',
          },
          {
            createdAtDate: '20200521',
            createdAtTime: '223443',
            orderRequestStatus: 'SCHEDULED',
          },
          {
            createdAtDate: '20200623',
            createdAtTime: '223443',
            orderRequestStatus: 'AWAITING_BILLING',
          },
          {
            createdAtDate: '20200525',
            createdAtTime: '223443',
            orderRequestStatus: 'COMPLETED',
          },
        ],
        serviceOrderEvents: [
          {
            appointment: {
              date: '2020-05-22',
              slotType: 'AM',
            },
            latestStatus: {
              createdAtDate: '20200522',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'COMPLETED',
            },
            product: 'EFR_D1',
            serviceOrderId: 'abc123',
            serviceOrderCategory: null,
          },
          {
            appointment: {
              date: '2020-05-22',
              slotType: 'PM',
            },
            latestStatus: {
              createdAtDate: '20200522',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'COMPLETED',
            },
            product: 'GCC_GS_1H',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
        ],
        verificationEvents: [
          {
            verificationCategory: 'R975',
            verificationEventId: '123123',
            verificationEventStatusUpdates: [
              {
                verificationCode: 'AD',
                verificationEventStatus: 'COMPLETED',
                createdAtDate: '20200520',
                createdAtTime: '092215',
              },
            ],
          },
        ],
      },
    ],
    orderType: 'MIMO_TRANSFER',
  },
];

const fakeServiceRequest: IOrderRequest = {
  accountNumber: '001234567890',
  address: {
    city: 'Bloomfield',
    line1: '123 Main Street',
    line2: null,
    state: 'MI',
    zip: '48301',
  },
  contactPhoneNumber: '7348675309',
  orderRequestType: 'MIMO_START',
  orderRequestStatusUpdates: [
    {
      createdAtDate: '20200519',
      createdAtTime: '131530',
      orderRequestStatus: 'REQUESTED',
    },
    {
      createdAtDate: '20200521',
      createdAtTime: '092215',
      orderRequestStatus: 'PROCESSED',
    },
    {
      createdAtDate: '20200522',
      createdAtTime: '223443',
      orderRequestStatus: 'SCHEDULED',
    },
  ],
  premiseId: 'premise123',
  products: [
    {
      isCanceled: false,
      productType: 'EFR_D1',
      serviceDate: '20200522',
    },
  ],
  serviceOrderEvents: [
    {
      appointment: {
        date: '20220522',
        slotType: 'AM',
      },
      latestStatus: {
        createdAtDate: '20200522',
        createdAtTime: '223443',
        serviceOrderEventStatus: 'ON_SCHEDULE',
      },
      product: 'EFR_D1',
      serviceOrderCategory: null,
      serviceOrderId: 'abc123',
    },
  ],
  verificationEvents: [
    {
      verificationCategory: 'R975',
      verificationEventId: '123123',
      verificationEventStatusUpdates: [
        {
          verificationCode: 'AD',
          verificationEventStatus: 'COMPLETED',
          createdAtDate: '20200520',
          createdAtTime: '092215',
        },
      ],
    },
  ],
  wantDate: '2022-05-22',
};

const fakeStartServiceRequest: IOrderRequest = {
  ...fakeServiceRequest,
  orderRequestType: 'MIMO_START',
};

const fakeStopServiceRequest: IOrderRequest = {
  ...fakeServiceRequest,
  orderRequestType: 'MIMO_STOP',
};

const fakeOrder: IOrder = {
  closedDetails: null,
  createdAt: '2020-04-19',
  createdBy: 'WEB',
  customer: {
    bpId: '6060842ABC',
    name: 'Fred Schneider',
  },
  orderNumber: 'invalid',
  orderRequests: [fakeServiceRequest],
  orderType: 'MIMO_START',
};

const getFakeOrderType = (orderNumber: string): OrderType => {
  if (orderNumber.startsWith('MI')) {
    return 'MIMO_START';
  }

  if (orderNumber.startsWith('MO')) {
    return 'MIMO_STOP';
  }

  if (orderNumber.startsWith('MT')) {
    return 'MIMO_TRANSFER';
  }

  throw new Error('order number must start with MI or MO or MT');
};

const getFakeServiceRequests = (orderType: OrderType): IOrderRequest[] => {
  switch (orderType) {
    case 'MIMO_START':
      return [fakeStartServiceRequest];
    case 'MIMO_STOP':
      return [fakeStopServiceRequest];
    case 'MIMO_TRANSFER':
      return [fakeStartServiceRequest, fakeStopServiceRequest];
    default:
      throw new Error('Invalid order type');
  }
};

const createFakeOrder = (orderNumber: string): IOrder => {
  const cannedOrder = fakeOrders.find((o: IOrder): boolean => o.orderNumber === orderNumber);

  if (cannedOrder) {
    return cannedOrder;
  }

  const fakeOrderType = getFakeOrderType(orderNumber);

  const order: IOrder = {
    ...fakeOrder,
    orderNumber: orderNumber.padEnd(10, '9'),
    orderRequests: getFakeServiceRequests(fakeOrderType),
    orderType: fakeOrderType,
  };

  return order;
};

// tslint:disable-next-line: max-file-line-count
export default createFakeOrder;
