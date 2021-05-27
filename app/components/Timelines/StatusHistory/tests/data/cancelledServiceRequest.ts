import { IOrderRequest } from 'types';

const cancelledServiceRequest: IOrderRequest = {
  accountNumber: '001234567890',
  address: {
    city: 'Hobbiton',
    line1: '1 Bagshot Row',
    line2: null,
    state: 'TS',
    zip: '02890',
  },
  contactPhoneNumber: '2483334444',
  orderRequestType: 'MIMO_START',
  orderRequestStatusUpdates: [
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
    {
      createdAtDate: '20200322',
      createdAtTime: '223443',
      orderRequestStatus: 'CANCELED',
    },
  ],
  premiseId: 'premise123',
  products: [
    {
      productType: 'EFR_D1',
      serviceDate: '2020-04-22',
    },
  ],
  serviceOrderEvents: [
    {
      appointment: {
        date: '2020-04-22',
        slotType: 'AM',
      },
      product: 'EFR_D1',
      serviceOrderCategory: null,
      serviceOrderId: 'abc123',
      latestStatus: {
        createdAtDate: '20200321',
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
          createdAtDate: '20200320',
          createdAtTime: '092215',
        },
      ],
    },
  ],
  wantDate: '2020-04-22',
};

export default cancelledServiceRequest;
