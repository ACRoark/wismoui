import { IOrderRequest } from 'types';
import isOrderRequestStatusNeedsVerification from '../isOrderRequestStatusNeedsVerification';

describe('isOrderRequestStatusNeedsVerification', (): void => {
  const emptyOrderRequestStatusUpdatesServiceRequest: IOrderRequest = {
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
    orderRequestStatusUpdates: [],
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
  };

  const needsVerificationServiceRequest: IOrderRequest = {
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
    orderRequestStatusUpdates: [{
      createdAtDate: '20200519',
      createdAtTime: '131530',
      orderRequestStatus: 'REQUESTED',
    },
    {
      createdAtDate: '20200519',
      createdAtTime: '161530',
      orderRequestStatus: 'NEEDS_VERIFICATION',
    }],
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
  };

  it('should return false when there are no order request status updates', (): void => {
    expect(isOrderRequestStatusNeedsVerification(emptyOrderRequestStatusUpdatesServiceRequest)).toBe(false);
  });

  it('should return true when the latest order request status update is needs verification', (): void => {
    expect(isOrderRequestStatusNeedsVerification(needsVerificationServiceRequest)).toBe(true);
  });
});
