import { IOrderRequestInfo } from '../../types';

import sortRequestsByType from '../sortRequestsByType';

const orderRequestStart: IOrderRequestInfo = {
  accountNumber: '00112233',
  address: {
    line1: '123 place st.',
    line2: null,
    city: 'Anytown',
    state: 'MI',
    zip: '48203',
  },
  currentOrderRequestStatus: null,
  orderRequestType: 'MIMO_START',
  premiseId: 'CB4',
  products: [],
  verificationEvents: [],
  wantDate: '',
};

const orderRequestStop: IOrderRequestInfo = {
  accountNumber: '00112233',
  address: {
    line1: '123 place st.',
    line2: null,
    city: 'Anytown',
    state: 'MI',
    zip: '48203',
  },
  currentOrderRequestStatus: null,
  orderRequestType: 'MIMO_STOP',
  premiseId: 'CB4',
  products: [],
  verificationEvents: [],
  wantDate: '',
};

const orderRequestsStartThenStop: IOrderRequestInfo[] = [orderRequestStart, orderRequestStop];
const orderRequestsStopThenStart: IOrderRequestInfo[] = [orderRequestStop, orderRequestStart];

describe('sortRequestByType', (): void => {
  it(`should return a sorted array that starts with 'MIMO_START' and  then 'MIMO_STOP' when the given array has 'MIMO_STOP' as the first Element`, (): void => {

    expect(sortRequestsByType(orderRequestsStopThenStart)).toEqual(orderRequestsStartThenStop);
  });
});
