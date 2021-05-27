import faker from 'faker';
import moment from 'moment';

import { IOrderRequestStatusUpdate } from 'types';

import generateOrderRequestStatus from './generateOrderRequestStatus';

const generateOrderRequestStatusUpdate = (): IOrderRequestStatusUpdate => {
  const timestamp = moment(faker.date.past());

  return {
    createdAtDate: timestamp.format('YYYYMMDD'),
    createdAtTime: timestamp.format('HH:mm:ss'),
    orderRequestStatus: generateOrderRequestStatus(),
  };
};

export default generateOrderRequestStatusUpdate;
