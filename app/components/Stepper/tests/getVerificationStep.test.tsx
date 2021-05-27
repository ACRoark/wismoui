import React from 'react';
import { FormattedMessage } from 'react-intl';

import createFakeOrder from 'components/createFakeOrder';
import DateStamp from 'components/DateStamp';
import ViewDetailsLink from 'components/ViewDetailsLink';
import IOrderRequestStatusUpdate from 'types/IOrderRequestStatusUpdate';
import IVerificationEvent from 'types/IVerificationEvent';

import getVerificationStep from '../getVerificationStep';
import messages from '../messages';
import { StepperStatus } from '../types';

const fakeOrder = createFakeOrder('MI55667788');
const fakeServiceRequest = fakeOrder.orderRequests[0];

const orderRequestStatusUpdatesNeedsVerification: IOrderRequestStatusUpdate[] = [
  {
    createdAtDate: '20200519',
    createdAtTime: '131530',
    orderRequestStatus: 'REQUESTED',
  },
  {
    createdAtDate: '20200520',
    createdAtTime: '131530',
    orderRequestStatus: 'NEEDS_VERIFICATION',
  },
];

const orderRequestStatusUpdatesPostVerification: IOrderRequestStatusUpdate[] = [
  {
    createdAtDate: '20200519',
    createdAtTime: '131530',
    orderRequestStatus: 'REQUESTED',
  },
  {
    createdAtDate: '20200520',
    createdAtTime: '092215',
    orderRequestStatus: 'PROCESSED',
  },
];

const orderRequestStatusUpdatesPreVerification: IOrderRequestStatusUpdate[] = [
  {
    createdAtDate: '20200519',
    createdAtTime: '131530',
    orderRequestStatus: 'REQUESTED',
  },
];

const orderRequestStatusUpdatesRetroMoveWithoutProcessed: IOrderRequestStatusUpdate[] = [
  {
    createdAtDate: '20200519',
    createdAtTime: '131530',
    orderRequestStatus: 'SCHEDULED',
  },
  {
    createdAtDate: '20200520',
    createdAtTime: '131530',
    orderRequestStatus: 'AWAITING_BILLING',
  },
];

describe('getVerificationStep', (): void => {
  it(`should return an empty description and a status of pending when verificationEvents is empty`, (): void => {
    const serviceRequest = {
      ...fakeServiceRequest,
      orderRequestStatusUpdates: orderRequestStatusUpdatesPreVerification,
      verificationEvents: [],
    };

    expect(getVerificationStep('2020-05-28', serviceRequest)).toEqual({
      description: '',
      key: 'Verification',
      status: StepperStatus.Pending,
      title: <FormattedMessage {...messages.verification} />,
    });
  });

  it(`should return a formatted message, date and a status of completed when verificationEvents has a verificationEventStatus of COMPLETED`, (): void => {
    const verificationEventsADStatusCode: IVerificationEvent[] = [{
      verificationCategory: 'R975',
      verificationEventId: '123123',
      verificationEventStatusUpdates: [
        {
          verificationCode: 'AD',
          verificationEventStatus: 'COMPLETED',
          createdAtDate: '20200320',
          createdAtTime: '092215',
        },
      ],
    }];

    const serviceRequest = {
      ...fakeServiceRequest,
      orderRequestStatusUpdates: orderRequestStatusUpdatesPreVerification,
      verificationEvents: verificationEventsADStatusCode,
    };

    expect(getVerificationStep('2020-03-19', serviceRequest)).toEqual({
      description: (
        <span>
          <FormattedMessage {...messages.completed} />
          &nbsp;
          <DateStamp value={verificationEventsADStatusCode[0].verificationEventStatusUpdates[0].createdAtDate} />
        </span>
      ),
      key: 'Verification',
      status: StepperStatus.Completed,
      title: <FormattedMessage {...messages.verification} />,
    });
  });

  it(`should return a formatted message, date and a completed status when we have a 'PROCESSED' request status and verificationEvents is empty`, (): void => {
    const serviceRequest = {
      ...fakeServiceRequest,
      orderRequestStatusUpdates: orderRequestStatusUpdatesPostVerification,
      verificationEvents: [],
    };

    expect(getVerificationStep('2020-05-19', serviceRequest)).toEqual({
      description: (
        <span>
          <FormattedMessage {...messages.completed} />
          &nbsp;
          <DateStamp value="20200520" />
        </span>
      ),
      key: 'Verification',
      status: StepperStatus.Completed,
      title: <FormattedMessage {...messages.verification} />,
    });
  });

  it(`should return a formatted message corresponding to the BPEM Error and a status of Error when the most recent status update is 'Active'`, (): void => {
    const verificationEventsActiveADCode: IVerificationEvent[] = [{
      verificationCategory: 'R975',
      verificationEventId: '123123',
      verificationEventStatusUpdates: [
        {
          verificationCode: 'AD',
          verificationEventStatus: 'ACTIVE',
          createdAtDate: '20200320',
          createdAtTime: '092215',
        },
      ],
    }];

    const serviceRequest = {
      ...fakeServiceRequest,
      orderRequestStatusUpdates: orderRequestStatusUpdatesNeedsVerification,
      verificationEvents: verificationEventsActiveADCode,
    };

    expect(getVerificationStep('2020-05-28', serviceRequest)).toEqual({
      description: (
        <span>
          <FormattedMessage {...messages[`${verificationEventsActiveADCode[0].verificationEventStatusUpdates[0].verificationCode}_description`]} />
          <ViewDetailsLink
            className="view-details-link"
            orderCreatedDate="2020-05-28"
            serviceRequest={serviceRequest}
          />
        </span>
      ),
      key: 'Verification',
      status: StepperStatus.Error,
      title: <FormattedMessage {...messages.verification} />,
    });
  });

  it(`should return a formatted message, date and a completed status when latest request status is 'NEEDS_VERIFICATION' when the most recent verificationCode is 'AP'`, (): void => {
    const verificationEventsActiveAPCode: IVerificationEvent[] = [{
      verificationCategory: 'R975',
      verificationEventId: '123123',
      verificationEventStatusUpdates: [
        {
          verificationCode: 'AP',
          verificationEventStatus: 'ACTIVE',
          createdAtDate: '20200320',
          createdAtTime: '092215',
        },
      ],
    }];

    const serviceRequest = {
      ...fakeServiceRequest,
      orderRequestStatusUpdates: orderRequestStatusUpdatesNeedsVerification,
      verificationEvents: verificationEventsActiveAPCode,
    };

    expect(getVerificationStep('2020-03-19', serviceRequest)).toEqual({
      description: (
        <span>
          <FormattedMessage {...messages.completed} />
          &nbsp;
          <DateStamp value={verificationEventsActiveAPCode[0].verificationEventStatusUpdates[0].createdAtDate} />
        </span>
      ),
      key: 'Verification',
      status: StepperStatus.Completed,
      title: <FormattedMessage {...messages.verification} />,
    });
  });

  it(`should return a completed status and the created at date for the completed verification event, when we have a processed status update, completed verificationEvents`, (): void => {
    const verificationEventsADStatusCode: IVerificationEvent[] = [{
      verificationCategory: 'R975',
      verificationEventId: '123123',
      verificationEventStatusUpdates: [
        {
          verificationCode: 'AD',
          verificationEventStatus: 'COMPLETED',
          createdAtDate: '20200320',
          createdAtTime: '092215',
        },
      ],
    }];

    const serviceRequest = {
      ...fakeServiceRequest,
      orderRequestStatusUpdates: orderRequestStatusUpdatesPostVerification,
      verificationEvents: verificationEventsADStatusCode,
    };

    expect(getVerificationStep('2020-03-19', serviceRequest)).toEqual({
      description: (
        <span>
          <FormattedMessage {...messages.completed} />
          &nbsp;
          <DateStamp value="20200320" />
        </span>
      ),
      key: 'Verification',
      status: StepperStatus.Completed,
      title: <FormattedMessage {...messages.verification} />,
    });
  });

  // tslint:disable-next-line: max-line-length
  it(`should return a completed status when we have a 'SCHEDULED' request status, with the date that it was 'SCHEDULED', verificationEvents is empty`, (): void => {
    const serviceRequest = {
      ...fakeServiceRequest,
      orderRequestStatusUpdates: orderRequestStatusUpdatesRetroMoveWithoutProcessed,
      verificationEvents: [],
    };

    expect(getVerificationStep('2020-05-17', serviceRequest)).toEqual({
      description: (
        <span>
          <FormattedMessage {...messages.completed} />
          &nbsp;
          <DateStamp value="20200519" />
        </span>
      ),
      key: 'Verification',
      status: StepperStatus.Completed,
      title: <FormattedMessage {...messages.verification} />,
    });
  });
});
