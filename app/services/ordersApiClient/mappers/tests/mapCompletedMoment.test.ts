import generate from 'testing/generators';
import { today } from 'testing/utils';
import { DateTime } from 'types';

import parse from '../../parsers';

import mapCompletedMoment from '../mapCompletedMoment';

import { statusUpdates } from './data';

jest.mock('../../parsers');

const mockParser = parse as jest.Mocked<typeof parse>;

describe('mapCompletedMoment(...)', (): void => {
  const currentDate = today();

  const completedOn = new DateTime(currentDate.format('YYYYMMDD'), currentDate.format('HH:mm:ss'));

  mockParser.dateTime.mockReturnValue(completedOn);

  const testData = [
    {
      expected: {
        completionDate: null,
        hasBillingInformation: false,
      },
      status: 'REQUESTED',
      statusUpdates: statusUpdates.forRequestedOrder,
    },
    {
      expected: {
        completionDate: null,
        hasBillingInformation: false,
      },
      status: 'NEEDS_VERIFICATION',
      statusUpdates: statusUpdates.forNeedsVerificationOrder,
    },
    {
      expected: {
        completionDate: null,
        hasBillingInformation: false,
      },
      status: 'PROCESSED',
      statusUpdates: statusUpdates.forProcessedOrder,
    },
    {
      expected: {
        completionDate: null,
        hasBillingInformation: false,
      },
      status: 'SCHEDULED',
      statusUpdates: statusUpdates.forScheduledOrder,
    },
    {
      expected: {
        completionDate: completedOn,
        hasBillingInformation: false,
      },
      status: 'AWAITING_BILLING',
      statusUpdates: statusUpdates.forAwaitingBillingOrder,
    },
    {
      expected: {
        completionDate: completedOn,
        hasBillingInformation: true,
      },
      status: 'COMPLETED',
      statusUpdates: statusUpdates.forCompletedOrder,
    }
  ];

  // tslint:disable-next-line: typedef
  testData.forEach((test): void => {
    it(`${test.expected.completionDate ? 'should': 'should not'} set the completion date when the status is ${test.status}`, (): void => {
      const request = generate.orderRequest();

      request.orderRequestStatusUpdates = test.statusUpdates;

      const result = mapCompletedMoment(request);

      expect(result.serviceCompletedOn).toEqual(test.expected.completionDate);
    });

    // tslint:disable-next-line: max-line-length
    it(`${test.expected.hasBillingInformation ? 'should': 'should not'} indicate billing information is available when the status is ${test.status}`, (): void => {
      const request = generate.orderRequest();

      request.orderRequestStatusUpdates = test.statusUpdates;

      const result = mapCompletedMoment(request);

      expect(result.hasBillingInformation).toEqual(test.expected.hasBillingInformation);
    });
  });
});
