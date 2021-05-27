import generate from 'testing/generators';
import { today } from 'testing/utils';
import { DateTime } from 'types';

import parse from '../../parsers';

import mapServiceAppointments from '../mapServiceAppointments';
import mapVerificationMoment from '../mapVerificationMoment';

import { statusUpdates } from './data';

jest.mock('../../parsers');
jest.mock('../mapServiceAppointments');

const mockMapper = mapServiceAppointments as jest.MockedFunction<typeof mapServiceAppointments>;
const mockParser = parse as jest.Mocked<typeof parse>;

describe('mapVerificationMoment(...)', (): void => {
  const currentDate = today();

  const completedOn = new DateTime(currentDate.format('YYYYMMDD'), currentDate.format('HH:mm:ss'));

  mockMapper.mockReturnValue([]);
  mockParser.dateTime.mockReturnValue(completedOn);

  const testData = [
    {
      expected: {
        appointments: [],
        currentStatus: 'PENDING',
        hasError: false,
        history: [],
        verificationCompletedOn: null,
      },
      status: 'REQUESTED',
      statusUpdates: statusUpdates.forRequestedOrder,
    },
    {
      expected: {
        appointments: [],
        currentStatus: 'PENDING',
        hasError: false,
        history: [],
        verificationCompletedOn: null,
      },
      status: 'NEEDS_VERIFICATION',
      statusUpdates: statusUpdates.forNeedsVerificationOrder,
    },
    {
      expected: {
        appointments: [],
        currentStatus: 'COMPLETED',
        hasError: false,
        history: [],
        verificationCompletedOn: completedOn,
      },
      status: 'PROCESSED',
      statusUpdates: statusUpdates.forProcessedOrder,
    },
    {
      expected: {
        appointments: [],
        currentStatus: 'COMPLETED',
        hasError: false,
        history: [],
        verificationCompletedOn: completedOn,
      },
      status: 'SCHEDULED',
      statusUpdates: statusUpdates.forScheduledOrder,
    },
    {
      expected: {
        appointments: [],
        currentStatus: 'COMPLETED',
        hasError: false,
        history: [],
        verificationCompletedOn: completedOn,
      },
      status: 'AWAITING_BILLING',
      statusUpdates: statusUpdates.forAwaitingBillingOrder,
    },
    {
      expected: {
        appointments: [],
        currentStatus: 'COMPLETED',
        hasError: false,
        history: [],
        verificationCompletedOn: completedOn,
      },
      status: 'COMPLETED',
      statusUpdates: statusUpdates.forCompletedOrder,
    }
  ];

  // tslint:disable-next-line: typedef
  testData.forEach((test): void => {
    it(`${test.expected.verificationCompletedOn ? 'should': 'should not'} set the completion date when the status is ${test.status}`, (): void => {
      const request = generate.orderRequest();

      request.orderRequestStatusUpdates = test.statusUpdates;

      const result = mapVerificationMoment(request);

      expect(result.verificationCompletedOn).toEqual(test.expected.verificationCompletedOn);
    });

    // tslint:disable-next-line: max-line-length
    it(`${test.expected.currentStatus === 'COMPLETED' ? 'should': 'should not'} set the current status to COMPLETED when the status is ${test.status}`, (): void => {
      const request = generate.orderRequest();

      request.orderRequestStatusUpdates = test.statusUpdates;

      const result = mapVerificationMoment(request);

      expect(result.currentStatus).toEqual(test.expected.currentStatus);
    });
  });
});
