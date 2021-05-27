import { IOrderRequest } from 'types';

import getBannerNotification from '../getBannerNotification';

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
  orderRequestStatusUpdates: [],
  orderRequestType: 'MIMO_START',
  premiseId: 'premise123',
  products: [],
  serviceOrderEvents: [],
  verificationEvents: [],
  wantDate: '20200422',
};

describe('getBannerNotification', (): void => {
  it('should return a DELAYED error banner over any other Error banner when given multiple services with errors', (): void => {
    const multipleErrorsServiceRequest: IOrderRequest = {
      ...fakeServiceRequest,
      serviceOrderEvents: [
        {
          appointment: {
            date: '20201211',
            slotType: null,
          },
          latestStatus: {
            createdAtDate: '20201210',
            createdAtTime: '223443',
            serviceOrderEventStatus: 'DELAYED',
          },
          product: 'EFR_D1',
          serviceOrderCategory: null,
          serviceOrderId: 'abc123',
        },
        {
          appointment: {
            date: '20201210',
            slotType: 'AM',
          },
          latestStatus: {
            createdAtDate: '20201210',
            createdAtTime: '223443',
            serviceOrderEventStatus: 'CANCELED_CGI',
          },
          product: 'GFR_A_H',
          serviceOrderCategory: null,
          serviceOrderId: 'abc123',
        },
      ],
    };

    const expected = {
      hasError: true,
      message: {
        id: 'DELAYED',
        values: null,
      },
    };

    expect(getBannerNotification(multipleErrorsServiceRequest)).toEqual(expected);
  });

  it('should return an error banner when given an error', (): void => {
    const errorServiceRequest: IOrderRequest = {
      ...fakeServiceRequest,
      serviceOrderEvents: [
        {
          appointment: {
            date: '20201210',
            slotType: 'AM',
          },
          latestStatus: {
            createdAtDate: '20201210',
            createdAtTime: '223443',
            serviceOrderEventStatus: 'CANCELED_CGI',
          },
          product: 'GFR_A_H',
          serviceOrderCategory: null,
          serviceOrderId: 'abc123',
        },
      ],
    };

    const expected = {
      hasError: true,
      message: {
        id: 'CANCELED_CGI',
        values: null,
      },
    };

    expect(getBannerNotification(errorServiceRequest)).toEqual(expected);
  });

  it('should NOT return a message values when given brand new order data', (): void => {
    const expected = {
      hasError: false,
      message: {
        id: 'MIMO_START',
        values: null,
      },
    };

    expect(getBannerNotification(fakeServiceRequest)).toEqual(expected);
  });

  it('should return correct data when given MIMO_START order with an active appointment', (): void => {
    const serviceRequest: IOrderRequest = {
      ...fakeServiceRequest,
      serviceOrderEvents: [
        {
          appointment: {
            date: '20200417',
            slotType: 'AM',
          },
          latestStatus: {
            createdAtDate: '20200305',
            createdAtTime: '223443',
            serviceOrderEventStatus: 'ON_SCHEDULE',
          },
          product: 'EFR_D1',
          serviceOrderCategory: null,
          serviceOrderId: 'abc123',
        },
      ],
    };

    const expected = {
      hasError: false,
      message: {
        id: 'MIMO_START',
        values: ['20200417'],
      },
    };

    expect(getBannerNotification(serviceRequest)).toEqual(expected);
  });

  it('should return correct date when given MIMO_START order with a CANCELED appointment that has a product that is still active', (): void => {
    const serviceRequest: IOrderRequest = {
      ...fakeServiceRequest,
      products: [
        {
          isCanceled: false,
          productType: 'EFR_D1',
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
            serviceOrderEventStatus: 'CANCELED',
          },
          product: 'EFR_D1',
          serviceOrderCategory: null,
          serviceOrderId: 'abc123',
        },
      ],
    };

    const expected = {
      hasError: false,
      message: {
        id: 'MIMO_START',
        values: ['20200422'],
      },
    };

    expect(getBannerNotification(serviceRequest)).toEqual(expected);
  });

  it('should return the verificationCode as the message ID when there is an ACTIVE verificationEventStatus', (): void => {
    const serviceRequest: IOrderRequest = {
      ...fakeServiceRequest,
      orderRequestStatusUpdates: [
        {
          createdAtDate:'20200422',
          createdAtTime: '223443',
          orderRequestStatus: 'NEEDS_VERIFICATION',
        },
      ],
      products: [
        {
          isCanceled: false,
          productType: 'EFR_D1',
          serviceDate: '20200422',
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
          ],
        },
      ],
    };

    const expected = {
      hasError: true,
      message: {
        id: 'AD',
        values: null,
      },
    };

    expect(getBannerNotification(serviceRequest)).toEqual(expected);
  });
});
