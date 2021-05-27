import IOrderRequest from 'types/IOrderRequest';
import IProduct from '../../types/IProduct';

export const fakeProductList: IProduct[] = [
  {
    productType: 'GCR_A_H',
    serviceDate: '2020-04-22',
  },
  {
    productType: 'EFR_D1',
    serviceDate: '2020-04-22',
  },
  {
    productType: 'EFR_D1_1',
    serviceDate: '2020-04-22',
  },
];

export const fakeServiceRequest: IOrderRequest = {
  accountNumber: '111122233334',
  address: {
    city: 'Bloomfield',
    line1: '123 Main',
    line2: null,
    state: 'MI',
    zip: '48301',
  },
  contactPhoneNumber: '7348675309',
  orderRequestStatusUpdates: [
    {
      createdAtDate: '20200319',
      createdAtTime: '131530',
      orderRequestStatus: 'REQUESTED',
    },
  ],
  orderRequestType: 'MIMO_START',
  premiseId: 'premise123',
  products: [
    {
      productType: 'GCR_A_H',
      serviceDate: '2020-04-22',
    },
    {
      productType: 'EFR_D1',
      serviceDate: '2020-04-22',
    },
    {
      productType: 'EFR_D1_1',
      serviceDate: '2020-04-22',
    },
  ],
  serviceOrderEvents: [
    {
      appointment: {
        date: '2020-04-17',
        slotType: 'AM',
      },
      latestStatus: {
          createdAtDate: '20200305',
          createdAtTime: '223443',
          serviceOrderEventStatus: 'COMPLETED',
        },
        product: 'EFR_D1',
      serviceOrderCategory: null,
      serviceOrderId: '123456789',
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
          createdAtDate: '20200319',
          createdAtTime: '131530',
        },
      ],
    },
  ],
  wantDate: '2020-04-22',
};

export const fakeStartServiceRequest: IOrderRequest = {
  ...fakeServiceRequest,
  orderRequestType: 'MIMO_START',
};

export const fakeStopServiceRequest: IOrderRequest = {
  ...fakeServiceRequest,
  orderRequestType: 'MIMO_STOP',
};
