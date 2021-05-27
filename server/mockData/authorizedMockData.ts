const results = {
  counts: { closed: 0, open: 2, total: 2 },
  orders: [
    {
      closedDetails: null,
      createdAt: '2020-05-19T13:15:30Z',
      createdBy: 'WEB',
      customer: {
        bpId: 'bp123',
        name: 'Frodo Baggins',
      },
      orderNumber: 'MO11223344',
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
          orderRequestType: 'MIMO_STOP',
          orderRequestStatusUpdates: [
            {
              createdAtDate: '20200921',
              createdAtTime: '081341',
              orderRequestStatus: 'PROCESSED',
            },
            {
              createdAtDate: '20200921',
              createdAtTime: '081342',
              orderRequestStatus: 'SCHEDULED',
            },
            {
              createdAtDate: '20200921',
              createdAtTime: '081345',
              orderRequestStatus: 'SCHEDULED',
            },
            {
              createdAtDate: '20200922',
              createdAtTime: '140205',
              orderRequestStatus: 'SCHEDULED',
            },
            {
              createdAtDate: '20200922',
              createdAtTime: '140209',
              orderRequestStatus: 'SCHEDULED',
            },
          ],
          premiseId: '5111746983',
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
              isCanceled: true,
              processedAtDate: '20200620',
              productType: 'EFR_D1_1',
              serviceDate: '20200622',
            },
            {
              docId: null,
              isCanceled: false,
              processedAtDate: '20200620',
              productType: 'GFR_AS_H',
              serviceDate: '20200622',
            },
            {
              docId: null,
              isCanceled: false,
              processedAtDate: '20200620',
              productType: 'ECC_D5',
              serviceDate: '20200622',
            },
          ],
          serviceOrderEvents: [
            {
              appointment: {
                date: '20200622',
                slotType: null,
              },
              latestStatus: {
                createdAtDate: '20200922',
                createdAtTime: '140205',
                serviceOrderEventStatus: 'CANCELED',
              },
              product: 'EFR_D1',
              serviceOrderCategory: 'SDI1',
              serviceOrderId: '800008161708',
            },
            {
              appointment: {
                date: '20200925',
                slotType: null,
              },
              latestStatus: {
                createdAtDate: '20200922',
                createdAtTime: '140209',
                serviceOrderEventStatus: 'CANCELED',
              },
              product: 'EFR_D1_1',
              serviceOrderCategory: 'SDI1',
              serviceOrderId: '800008161709',
            },
            {
              appointment: {
                date: '20200925',
                slotType: 'PM',
              },
              latestStatus: {
                createdAtDate: '20200922',
                createdAtTime: '140209',
                serviceOrderEventStatus: 'ON_SCHEDULE',
              },
              product: 'ECC_D5',
              serviceOrderCategory: 'SDI1',
              serviceOrderId: '800008161709',
            },
            {
              appointment: {
                date: '20200925',
                slotType: 'AM',
              },
              latestStatus: {
                createdAtDate: '20200922',
                createdAtTime: '140209',
                serviceOrderEventStatus: 'ON_SCHEDULE',
              },
              product: 'GFR_AS_H',
              serviceOrderCategory: 'SDI1',
              serviceOrderId: '800008161709',
            },
          ],
          verificationEvents: [],
          wantDate: '20200622',
        },
      ],
      orderType: 'MIMO_START',
    },
    {
      closedDetails: null,
      createdAt: '2020-05-19T13:15:30Z',
      createdBy: 'WEB',
      customer: {
        bpId: 'bp123',
        name: 'Frodo Baggins',
      },
      orderNumber: 'MO12345679',
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
          orderRequestType: 'MIMO_STOP',
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
      orderType: 'MIMO_STOP',
    },
  ],
};

export default results;
