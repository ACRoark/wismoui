import * as _ from 'lodash';

import generate from 'testing/generators';
import { IOrderRequestStatusUpdate } from 'types';

import findOrderRequestStatusUpdates from '../findOrderRequestStatusUpdate';

describe('findOrderRequestStatusUpdates(...)', (): void => {
  it('should return the event when the request contains the specified status', (): void => {
    const orderRequest = generate.orderRequest();

    const event: IOrderRequestStatusUpdate = _.last(orderRequest.orderRequestStatusUpdates);

    const status = event.orderRequestStatus;

    const result = findOrderRequestStatusUpdates(orderRequest, status);

    expect(result).toBe(event);
  });

  it('should return undefined when the request does not contain the specified status', (): void => {
    const orderRequest = generate.orderRequest();

    const event: IOrderRequestStatusUpdate = _.last(orderRequest.orderRequestStatusUpdates);

    const status = event.orderRequestStatus;

    orderRequest.orderRequestStatusUpdates = _.dropRight(orderRequest.orderRequestStatusUpdates);

    const result = findOrderRequestStatusUpdates(orderRequest, status);

    expect(result).toEqual(undefined);
  });
});
