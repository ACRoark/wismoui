import { IOrderRequest } from 'types';

const retroStartServiceRequest: IOrderRequest = {
  accountNumber: '000987654321',
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
      createdAtDate: '20200423',
      createdAtTime: '092215',
      orderRequestStatus: 'AWAITING_BILLING',
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
  verificationEvents: [],
  wantDate: '2020-04-22',
};

export default retroStartServiceRequest;
