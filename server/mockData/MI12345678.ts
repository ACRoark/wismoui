const orderRequest = {
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
          docId: null,
          isCanceled: false,
          processedAtDate: '20200620',
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

export default orderRequest;
