import { shallow } from 'enzyme';
import React from 'react';

import { IOrderRequest } from 'types';
import ServiceRequestBanner2 from '..';
import DefaultBanner from '../DefaultBanner';
import ErrorBanner from '../ErrorBanner';

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

describe('ServiceRequestBanner', (): void => {
  const serviceRequest: IOrderRequest = {
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
    ],
  };

  it('should show the default banner when there is not an error', (): void => {
    const wrapper = shallow(<ServiceRequestBanner2 serviceRequest={fakeServiceRequest} />);

    expect(wrapper.find(DefaultBanner)).toHaveLength(1);
  });

  it('should show the error banner when there is an error', (): void => {
    const wrapper = shallow(<ServiceRequestBanner2 serviceRequest={serviceRequest} />);

    expect(wrapper.find(ErrorBanner)).toHaveLength(1);
  });
});
