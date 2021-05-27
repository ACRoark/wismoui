import generateAccountNumber from './generateAccountNumber';
import generateAddress from './generateAddress';
import generateBpId from './generateBpid';
import generateClosedDetails from './generateClosedDetails';
import { generateFutureDate, generatePastDate } from './generateDate';
import generateLastName from './generateName';
import generateOrderNumber from './generateOrderNumber';
import {
  generateOrderRequest,
  generateOrderRequestArray,
  generateOrderRequestInfo,
  generateOrderRequestInfoArray,
} from './generateOrderRequest';
import generateOrderRequestStatus from './generateOrderRequestStatus';
import generateOrderRequestStatusUpdate from './generateOrderRequestStatusUpdate';
import generateOrderRequestStatusUpdates from './generateOrderRequestStatusUpdates';
import generateOrderRequestType from './generateOrderRequestType';
import generateOrderType from './generateOrderType';
import generatePhoneNumber from './generatePhoneNumber';
import generatePremiseId from './generatePremiseId';
import generateProductType from './generateProductType';
import generateRandomNumber from './generateRandomNumber';
import generateSearchResult from './generateSearchResult';
import generateSearchResults from './generateSearchResults';
import generateServiceAppointment from './generateServiceAppointment';
import { generateServiceOrderEvent, generateServiceOrderEventArray } from './generateServiceOrderEvent';
import generateServiceOrderEventStatus from './generateServiceOrderEventStatus';
import generateServiceOrderEventStatusUpdate from './generateServiceOrderEventStatusUpdate';
import generateSlotType from './generateSlotType';
import { generateAlphanumericString, generateNumericString, generateString } from './generateString';

const generate = {
  accountNumber: generateAccountNumber,
  address: generateAddress,
  alphanumericString: generateAlphanumericString,
  bpId: generateBpId,
  closedDetails: generateClosedDetails,
  futureDate: generateFutureDate,
  lastName: generateLastName,
  numericString: generateNumericString,
  orderNumber: generateOrderNumber,
  orderRequest: generateOrderRequest,
  orderRequestArray: generateOrderRequestArray,
  orderRequestInfo: generateOrderRequestInfo,
  orderRequestInfoArray: generateOrderRequestInfoArray,
  orderRequestStatus: generateOrderRequestStatus,
  orderRequestStatusUpdate: generateOrderRequestStatusUpdate,
  orderRequestStatusUpdates: generateOrderRequestStatusUpdates,
  orderRequestType: generateOrderRequestType,
  orderSearchResult: generateSearchResult,
  orderSearchResults: generateSearchResults,
  orderType: generateOrderType,
  pastDate: generatePastDate,
  phoneNumber: generatePhoneNumber,
  premiseId: generatePremiseId,
  productType: generateProductType,
  randomNumber: generateRandomNumber,
  serviceAppointment: generateServiceAppointment(),
  serviceOrderEvent: generateServiceOrderEvent(),
  serviceOrderEventArray: generateServiceOrderEventArray(),
  serviceOrderEventStatus: generateServiceOrderEventStatus,
  serviceOrderEventStatusUpdate: generateServiceOrderEventStatusUpdate,
  slotType: generateSlotType(),
  string: generateString,
};

export default generate;
