import React, { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import createFakeOrder from 'components/createFakeOrder';
import DateStamp from 'components/DateStamp';
import ViewDetailsLink from 'components/ViewDetailsLink';
import useFlags from 'hooks/useFlags';
import Description from 'types/Description';
import IOrderRequestStatusUpdate from 'types/IOrderRequestStatusUpdate';
import IVerificationEvent from 'types/IVerificationEvent';
import filterVerificationEvents from 'utils/filterVerificationEvents';

import getBpemMessage2 from '../getBpemMessage2';
import getVerificationStep2 from '../getVerificationStep2';
import messages from '../messages';
import { StepperStatus } from '../types';

jest.mock('hooks/useFlags');

const mockFlags = useFlags as jest.MockedFunction<typeof useFlags>;

describe('getVerificationStep2', (): void => {
  const fakeOrder = createFakeOrder('MI12345678');
  const fakeServiceRequest = fakeOrder.orderRequests[0];

  mockFlags.mockReturnValue({
    bug3665: false,
    canChangeLanguage: true,
    developerMode: true,
  });

  // order request status updates
  const needsVerificationOrderRequestStatusUpdates: IOrderRequestStatusUpdate[] = [
    {
      createdAtDate: '10052020',
      createdAtTime: '080101',
      orderRequestStatus: 'REQUESTED',
    },
    {
      createdAtDate: '10052020',
      createdAtTime: '080201',
      orderRequestStatus: 'NEEDS_VERIFICATION',
    },
  ];
  const processedOrderRequestStatusUpdates: IOrderRequestStatusUpdate[] = [
    {
      createdAtDate: '10052020',
      createdAtTime: '080101',
      orderRequestStatus: 'REQUESTED',
    },
    {
      createdAtDate: '10052020',
      createdAtTime: '080201',
      orderRequestStatus: 'PROCESSED',
    },
  ];
  const scheduledOrderRequestStatusUpdates: IOrderRequestStatusUpdate[] = [
    {
      createdAtDate: '10052020',
      createdAtTime: '080101',
      orderRequestStatus: 'REQUESTED',
    },
    {
      createdAtDate: '10052020',
      createdAtTime: '080201',
      orderRequestStatus: 'SCHEDULED',
    },
  ];

  // verification events
  const singleBpemVerificationEvents: IVerificationEvent[] = [
    {
      verificationCategory: 'R975',
      verificationEventId: '123111',
      verificationEventStatusUpdates: [
        {
          createdAtDate: '10052020',
          createdAtTime: '091510',
          verificationCode: 'AD',
          verificationEventStatus: 'ACTIVE',
        }
      ]
    },
  ];
  const multipleBpemVerificationEvents: IVerificationEvent[] = [
    {
      verificationCategory: 'R975',
      verificationEventId: '123111',
      verificationEventStatusUpdates: [
        {
          createdAtDate: '10052020',
          createdAtTime: '091510',
          verificationCode: 'AD',
          verificationEventStatus: 'ACTIVE',
        }
      ]
    },
    {
      verificationCategory: 'R980',
      verificationEventId: '123112',
      verificationEventStatusUpdates: [
        {
          createdAtDate: '10052020',
          createdAtTime: '092010',
          verificationCode: 'PR',
          verificationEventStatus: 'ACTIVE',
        }
      ]
    },
  ];

  const verificationEventsOutsideStep: IVerificationEvent[] = [
    {
      verificationCategory: 'R975',
      verificationEventId: '123111',
      verificationEventStatusUpdates: [
        {
          createdAtDate: '10052020',
          createdAtTime: '091510',
          verificationCode: 'AP',
          verificationEventStatus: 'ACTIVE',
        }
      ]
    },
  ];

  it(`should return an object with an empty description and a pending status when verificationEvents is empty and the latest orderRequestStatusUpdate isn't 'PROCESSED' or 'SCHEDULED`, (): void => {
    const description: ReactElement | string = '';
    const status = StepperStatus.Pending;
    const step = {
      description,
      key: 'Verification',
      status,
      title: <FormattedMessage {...messages.verification} />,
    };

    expect(getVerificationStep2(fakeOrder.createdAt, fakeServiceRequest)).toEqual(step);
  });

  it('should return an object with a description including the processed date and a completed status when verificationEvents is empty and a PROCESSED order status exists', (): void => {
    const verificationCompletedServiceRequest = {
      ...fakeServiceRequest,
      orderRequestStatusUpdates: processedOrderRequestStatusUpdates,
    };
    const description: ReactElement | string = (
      <span>
        <FormattedMessage {...messages.completed} />
        <DateStamp value={verificationCompletedServiceRequest.orderRequestStatusUpdates[1].createdAtDate} />
      </span>
    );
    const status = StepperStatus.Completed;
    const step = {
      description,
      key: 'Verification',
      status,
      title: <FormattedMessage {...messages.verification} />,
    };

    expect(getVerificationStep2(fakeOrder.createdAt, verificationCompletedServiceRequest)).toEqual(step);
  });

  it('should return an object with a description including the processed date and a completed status when verificationEvents only has ACTIVE events outside the Verification Step and a SCHEDULED order status exists', (): void => {
    const verificationScheduledServiceRequest = {
      ...fakeServiceRequest,
      orderRequestStatusUpdates: scheduledOrderRequestStatusUpdates,
      verificationEvents: verificationEventsOutsideStep,
    };
    const description: ReactElement | string = (
      <span>
        <FormattedMessage {...messages.completed} />
        <DateStamp value={verificationScheduledServiceRequest.orderRequestStatusUpdates[1].createdAtDate} />
      </span>
    );
    const status = StepperStatus.Completed;
    const step = {
      description,
      key: 'Verification',
      status,
      title: <FormattedMessage {...messages.verification} />,
    };

    expect(getVerificationStep2(fakeOrder.createdAt, verificationScheduledServiceRequest)).toEqual(step);
  });

  it('should return an object with a description including the processed date and a completed status when verificationEvents only has ACTIVE events outside the Verification Step and current status is NEEDS_VERIFICATION', (): void => {
    const verificationScheduledServiceRequest = {
      ...fakeServiceRequest,
      orderRequestStatusUpdates: needsVerificationOrderRequestStatusUpdates,
      verificationEvents: verificationEventsOutsideStep,
    };
    const description: ReactElement | string = (
      <span>
        <FormattedMessage {...messages.completed} />
        <DateStamp value={verificationScheduledServiceRequest.orderRequestStatusUpdates[1].createdAtDate} />
      </span>
    );
    const status = StepperStatus.Completed;
    const step = {
      description,
      key: 'Verification',
      status,
      title: <FormattedMessage {...messages.verification} />,
    };

    expect(getVerificationStep2(fakeOrder.createdAt, verificationScheduledServiceRequest, { bug3665: true } )).toEqual(step);
  });

  it('should return an object with a description including the scheduled date and a completed status when verificationEvents is empty and a SCHEDULED order status exists', (): void => {
    const verificationCompletedServiceRequest = {
      ...fakeServiceRequest,
      orderRequestStatusUpdates: scheduledOrderRequestStatusUpdates,
    };
    const description: ReactElement | string = (
      <span>
        <FormattedMessage {...messages.completed} />
        <DateStamp value={verificationCompletedServiceRequest.orderRequestStatusUpdates[1].createdAtDate} />
      </span>
    );
    const status = StepperStatus.Completed;
    const step = {
      description,
      key: 'Verification',
      status,
      title: <FormattedMessage {...messages.verification} />,
    };

    expect(getVerificationStep2(fakeOrder.createdAt, verificationCompletedServiceRequest)).toEqual(step);
  });

  it('should return an object with a bpem message in the description and an error status when there is only 1 active BPEM and the current status is NEEDS_VERIFICATION', (): void => {
    const verificationCompletedServiceRequest = {
      ...fakeServiceRequest,
      orderRequestStatusUpdates: needsVerificationOrderRequestStatusUpdates,
      verificationEvents: singleBpemVerificationEvents,
    };
    const description: ReactElement | string = (
      <span>
        <FormattedMessage {...messages[`${verificationCompletedServiceRequest.verificationEvents[0].verificationEventStatusUpdates[0].verificationCode}_description`]} />
        <ViewDetailsLink
          className="view-details-link"
          orderCreatedDate={fakeOrder.createdAt}
          serviceRequest={verificationCompletedServiceRequest}
        />
      </span>
    );
    const status = StepperStatus.Error;
    const step = {
      description,
      key: 'Verification',
      status,
      title: <FormattedMessage {...messages.verification} />,
    };

    expect(getVerificationStep2(fakeOrder.createdAt, verificationCompletedServiceRequest)).toEqual(step);
  });

  it('should return an object with multiple bpem messages in the description and an error status when there are many verification events with active BPEMs and the current status is NEEDS_VERIFICATION', (): void => {
    const verificationCompletedServiceRequest = {
      ...fakeServiceRequest,
      orderRequestStatusUpdates: needsVerificationOrderRequestStatusUpdates,
      verificationEvents: multipleBpemVerificationEvents,
    };
    const description: Description = ([
      <>
        <FormattedMessage
          {...messages.multiple_bpem_description}
          values={{
            verificationCategory: <FormattedMessage {...messages[`${multipleBpemVerificationEvents[0].verificationCategory}_description`]} />,
            verificationCode:
          <FormattedMessage {...messages[`${multipleBpemVerificationEvents[0].verificationEventStatusUpdates[0].verificationCode}_description`]} />,
          }}/>
        <ViewDetailsLink className="view-details-link" orderCreatedDate={fakeOrder.createdAt} serviceRequest={verificationCompletedServiceRequest} />
      </>,
      <>
        <FormattedMessage
          {...messages.multiple_bpem_description}
          values={{
            verificationCategory: <FormattedMessage {...messages[`${multipleBpemVerificationEvents[1].verificationCategory}_description`]} />,
            verificationCode:
          <FormattedMessage {...messages[`${multipleBpemVerificationEvents[1].verificationEventStatusUpdates[0].verificationCode}_description`]} />,
          }}/>
        <ViewDetailsLink className="view-details-link" orderCreatedDate={fakeOrder.createdAt} serviceRequest={verificationCompletedServiceRequest} />
      </>,
    ]);
    const status = StepperStatus.Error;
    const step = {
      description,
      key: 'Verification',
      status,
      title: <FormattedMessage {...messages.verification} />,
    };

    expect(getVerificationStep2(fakeOrder.createdAt, verificationCompletedServiceRequest)).toEqual(step);
  });

  it('should return an object with multiple bpem messages in the description and an error status when there are many verification events with active BPEMs, the current status is NEEDS_VERIFICATION and bug3883 is true', (): void => {
    const verificationCompletedServiceRequest = {
      ...fakeServiceRequest,
      orderRequestStatusUpdates: needsVerificationOrderRequestStatusUpdates,
      verificationEvents: multipleBpemVerificationEvents,
    };
    const verificationCodes = ['AD', 'AN', 'CL', 'DR', 'ES', 'FV', 'FW', 'LD', 'PR', 'RE', 'RF', 'SC'];
    const filteredVerificationEvents = filterVerificationEvents(verificationCompletedServiceRequest.verificationEvents, verificationCodes);
    const description: Description = filteredVerificationEvents.map(
      (event: IVerificationEvent): ReactElement =>
        getBpemMessage2(event, fakeOrder.createdAt, verificationCompletedServiceRequest)
    );
    const status = StepperStatus.Error;
    const step = {
      description,
      key: 'Verification',
      status,
      title: <FormattedMessage {...messages.verification} />,
    };

    expect(getVerificationStep2(fakeOrder.createdAt, verificationCompletedServiceRequest, { bug3883: true })).toEqual(step);
  });

  // tslint:disable-next-line:max-line-length
  it('should return an object with a pending message when the current status is NEEDS_VERIFICATION and the filtered verification events is empty', (): void => {
    const verificationCompletedServiceRequest = {
      ...fakeServiceRequest,
      orderRequestStatusUpdates: needsVerificationOrderRequestStatusUpdates,
      verificationEvents: verificationEventsOutsideStep,
    };
    const description: ReactElement | string = '';
    const status = StepperStatus.Pending;
    const step = {
      description,
      key: 'Verification',
      status,
      title: <FormattedMessage {...messages.verification} />,
    };

    expect(getVerificationStep2(fakeOrder.createdAt, verificationCompletedServiceRequest)).toEqual(step);
  });
});
