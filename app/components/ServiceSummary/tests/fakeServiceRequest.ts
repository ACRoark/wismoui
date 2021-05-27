import IOrderRequest from 'types/IOrderRequest';

const fakeServiceRequest: IOrderRequest = {
  accountNumber: '111122233334',
  address: {
    city: 'Bloomfield',
    line1: '123 Main',
    line2: null,
    state: 'MI',
    zip: '48301-1234',
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
      serviceDate: '20200422',
    },
    {
      productType: 'EFR_D1',
      serviceDate: '20200422',
    },
    {
      productType: 'EFR_D1_1',
      serviceDate: '20200422',
    },
  ],
  serviceOrderEvents: [
    {
      appointment: {
        date: '20200417',
        slotType: 'AM',
      },
      latestStatus: {
        createdAtDate: '20200305',
        createdAtTime: '223443',
        serviceOrderEventStatus: 'COMPLETED',
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
          createdAtDate: '20200319',
          createdAtTime: '092215',
        },
      ],
    },
  ],
  wantDate: '20200422',
};

export default fakeServiceRequest;
