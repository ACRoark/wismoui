import { IOrderRequest, IOrderRequestInfo } from 'types';
import IOrderRequestBase from 'types/IOrderRequestBase';

import generateAccountNumber from './generateAccountNumber';
import generateAddress from './generateAddress';
import { generateFutureDate } from './generateDate';
import generateOrderRequestStatusUpdate from './generateOrderRequestStatusUpdate';
import generateOrderRequestStatusUpdates from './generateOrderRequestStatusUpdates';
import generateOrderRequestType from './generateOrderRequestType';
import generatePhoneNumber from './generatePhoneNumber';
import generatePremiseId from './generatePremiseId';
import generateProductType from './generateProductType';
import { generateServiceOrderEventArray } from './generateServiceOrderEvent';

const generateOrderRequestBase = (): IOrderRequestBase => ({
  accountNumber: generateAccountNumber(),
  address: generateAddress(),
  orderRequestType: generateOrderRequestType(),
  premiseId: generatePremiseId(),
  products: [{ productType: generateProductType(), serviceDate: generateFutureDate() }],
  wantDate: generateFutureDate(),
});

const generateOrderRequest = (): IOrderRequest => ({
  ...generateOrderRequestBase(),
  contactPhoneNumber: generatePhoneNumber(),
  orderRequestStatusUpdates: generateOrderRequestStatusUpdates(),
  serviceOrderEvents: generateServiceOrderEventArray(),
  verificationEvents: [],
});

const generateOrderRequestArray = (count: number = 1): IOrderRequest[] => {
  const requests: IOrderRequest[] = [];

  for (let i = 0; i < count; i++) {
    requests.push(generateOrderRequest());
  }

  return requests;
};

const generateOrderRequestInfo = (): IOrderRequestInfo => ({
  ...generateOrderRequestBase(),
  currentOrderRequestStatus: generateOrderRequestStatusUpdate(),
  verificationEvents: [],
});

const generateOrderRequestInfoArray = (count: number = 1): IOrderRequestInfo[] => {
  const requests: IOrderRequestInfo[] = [];

  for (let i = 0; i < count; i++) {
    requests.push(generateOrderRequestInfo());
  }

  return requests;
};

export { generateOrderRequest, generateOrderRequestArray, generateOrderRequestInfo, generateOrderRequestInfoArray };
