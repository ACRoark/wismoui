# Creating Mock Data

## Location

All mock data will be stored within server/mockData.

## Authorized User Flow

1. Create a file where your Authorized User results object will be stored. The name of this file will be used within the searchOrders url. [Examples of replacing the URL](api.md)

2. Within the Authorized User file that you just created, create a results object that matches the IOrderSearchResults(plural) interface found in app/types/IOrderSearchResults.

> Example:
```javascript
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
    },
    {
      closedDetails: null,
      createdAt: '2020-05-19T13:15:30Z',
      createdBy: 'WEB',
      customer: {
        bpId: 'bp123',
        name: 'Frodo Baggins',
      },
      orderNumber: 'MI12345679',
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
```

3. Import the Authorized User file that you created in the server/mockData/index.ts file.

4. **For each order that is within the Authorized User file that you created, a separate mock order file needs to be created. Instructions for creating a mock order file are below.**

## Guest User Flow

1. Create a file where the name of the file is the mock order's orderNumber. 
```
Ex: MI12345678.ts for a mock order that has orderNumber: MI12345678
```

2. Within the mock order file you just created, add the mock order object and export that object. This object will match the IOrderRequest interface found in app/types/IOrderRequest.ts.

> Example:
```javascript
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
```

3. Import the mock order file you just created in the server/mockData/index.ts file.

