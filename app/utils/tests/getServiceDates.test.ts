import { IOrderRequest } from 'types';

import getServiceDate from '../getServiceDate';

describe('getServiceDate', (): void => {
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
        isCanceled: true,
        productType: 'EFR_D1',
        serviceDate: '20200520',
      },
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
    verificationEvents: [],
    wantDate: '20220522',
  };

  it('should return null when there are no products or service order events', (): void => {
    const noProductsOrServiceOrderEvents: IOrderRequest = {
      ...fakeServiceRequest,
      products: [],
      serviceOrderEvents: [],
    };

    expect(getServiceDate(noProductsOrServiceOrderEvents)).toBe(null);
  });

  it('should return the last product service date when given a service request with multiple products', (): void => {
    expect(getServiceDate(fakeServiceRequest)).toBe('20200522');
  });

  it('should return the most recent service order event appointment date when there are no products', (): void => {
    const noProducts: IOrderRequest = {
      ...fakeServiceRequest,
      products: [],
      serviceOrderEvents: [
        {
          appointment: {
            date: '20220520',
            slotType: 'AM',
          },
          latestStatus: {
            createdAtDate: '20200520',
            createdAtTime: '223443',
            serviceOrderEventStatus: 'CANCELED',
          },
          product: 'EFR_D1',
          serviceOrderCategory: null,
          serviceOrderId: 'abc123',
        },
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
    };

    expect(getServiceDate(noProducts)).toBe('20220522');
  });
});
