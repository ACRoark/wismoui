import generate from 'testing/generators';
import { today } from 'testing/utils';
import { DateTime } from 'types';

import parse from '../../parsers';

import mapRequestedMoment from '../mapRequestedMoment';

import { statusUpdates } from './data';

jest.mock('../../parsers');

const mockParser = parse as jest.Mocked<typeof parse>;

describe('mapRequestedMoment(...)', (): void => {
  const currentDate = today();

  const occurredOn = new DateTime(currentDate.format('YYYYMMDD'), currentDate.format('HH:mm:ss'));

  mockParser.dateTime.mockReturnValue(occurredOn);

  const testData = [
    statusUpdates.forRequestedOrder,
    statusUpdates.forNeedsVerificationOrder,
    statusUpdates.forProcessedOrder,
    statusUpdates.forScheduledOrder,
    statusUpdates.forAwaitingBillingOrder,
    statusUpdates.forCompletedOrder,
  ];

  // tslint:disable-next-line: typedef
  testData.forEach((test): void => {
    it(`should set the occurrence date when the status is ${test[test.length - 1].orderRequestStatus}`, (): void => {
      const request = generate.orderRequest();

      request.orderRequestStatusUpdates = test;

      const result = mapRequestedMoment(request);

      expect(result.occurredOn).toEqual(occurredOn);
    });
  });
});
