import React from 'react';
import { FormattedMessage } from 'react-intl';

import createFakeOrder from 'components/createFakeOrder';
import ViewDetailsLink from 'components/ViewDetailsLink';

import useFlags from 'hooks/useFlags';
import { IOrderRequestStatusUpdate, IServiceOrderEvent } from 'types';

import getCompletedStep from '../getCompletedStep';

import messages from '../messages';
import { StepperStatus } from '../types';

jest.mock('hooks/useFlags');

const serviceRequest = createFakeOrder('MI33445566').orderRequests[0];
const mockFlags = useFlags as jest.MockedFunction<typeof useFlags>;

describe('getCompletedStep', (): void => {
  mockFlags.mockReturnValue({
    canChangeLanguage: true,
    developerMode: true,
  });

  it('should return an empty description and a status of pending when the serviceOrderEvents array is empty', (): void => {
    const emptyServiceOrderEventsRequest = {
      ...serviceRequest,
      serviceOrderEvents: [],
    };

    expect(getCompletedStep('2020-07-30', emptyServiceOrderEventsRequest)).toEqual({
      description: '',
      key: 'Completed',
      status: StepperStatus.Pending,
      title: <FormattedMessage {...messages.completed} />,
    });
  });

  it(`should return a formatted message, date and a status of pending when the most recent serviceOrderEventStatus is 'COMPLETED'`, (): void => {
    const completedServiceOrderEvents: IServiceOrderEvent[] = [
      {
        appointment: {
          date: '2020-05-22',
          slotType: 'AM',
        },
        latestStatus: {
          createdAtDate: '20200522',
          createdAtTime: '223443',
          serviceOrderEventStatus: 'COMPLETED',
        },
        product: 'EFR_D1',
        serviceOrderCategory: null,
        serviceOrderId: 'abc123',
      },
    ];

    const completedServiceOrderEventsRequest = {
      ...serviceRequest,
      serviceOrderEvents: completedServiceOrderEvents,
    };

    expect(getCompletedStep('2020-07-29', completedServiceOrderEventsRequest)).toEqual({
      description: '',
      key: 'Completed',
      status: StepperStatus.Pending,
      title: <FormattedMessage {...messages.completed} />,
    });
  });

  // tslint:disable-next-line:max-line-length
  it(`should return a formatted message corresponding to the 'CANCELED' status code and an Error status when the most recent status update is 'CANCELED'`, (): void => {
    const serviceOrderEventsCanceled: IServiceOrderEvent[] = [
      {
        appointment: {
          date: '2020-05-22',
          slotType: 'AM',
        },
        latestStatus: {
          createdAtDate: '20200522',
          createdAtTime: '223443',
          serviceOrderEventStatus: 'CANCELED',
        },
        product: 'EFR_D1',
        serviceOrderCategory: null,
        serviceOrderId: 'abc123',
      },
    ];

    const orderStatusCanceled: IOrderRequestStatusUpdate[] = [
      {
        createdAtDate: '20200522',
        createdAtTime: '223443',
        orderRequestStatus: 'CANCELED',
      },

    ];

    const canceledServiceOrderEventsRequest = {
      ...serviceRequest,
      orderRequestStatusUpdates: orderStatusCanceled,
      serviceOrderEvents: serviceOrderEventsCanceled
    };

    expect(getCompletedStep('2020-07-25', canceledServiceOrderEventsRequest)).toEqual({
      description: (
        <span>
          <FormattedMessage {...messages[`${canceledServiceOrderEventsRequest.serviceOrderEvents[0].latestStatus.serviceOrderEventStatus}_description`]} />
          <ViewDetailsLink className={'view-details-link'}
                           orderCreatedDate={'2020-07-25'}
                           serviceRequest={canceledServiceOrderEventsRequest}
          />
        </span>
      ),
      key: 'Completed',
      status: StepperStatus.Error,
      title: <FormattedMessage {...messages.completed} />,
    });
  });

  // tslint:disable-next-line:max-line-length
  it(`should return a formatted message corresponding to the 'CANCELED' status code and an Error status when the most recent status update is 'CANCELED'`, (): void => {
    const orderStatusCanceled: IOrderRequestStatusUpdate[] = [
      {
          createdAtDate: '20200522',
          createdAtTime: '223443',
          orderRequestStatus: 'CANCELED',
        },

    ];

    const canceledOrderRequest = {
      ...serviceRequest,
      orderRequestStatusUpdates: orderStatusCanceled,
    };

    expect(getCompletedStep('2020-07-25', canceledOrderRequest)).toEqual({
      description: (
      <span>
        <FormattedMessage {...messages[`${canceledOrderRequest.orderRequestStatusUpdates[0].orderRequestStatus}_description`]} />
        <ViewDetailsLink className={'view-details-link'}
                       orderCreatedDate={'2020-07-25'}
                       serviceRequest={canceledOrderRequest}
        />
      </span>
    ),
      key: 'Completed',
      status: StepperStatus.Error,
      title: <FormattedMessage {...messages.completed} />,
    });
  });

  // tslint:disable-next-line:max-line-length
  it(`should not go to the completed step when service order event status is canceled but order request status is not canceled`, (): void => {
    const orderStatusNotCanceled: IOrderRequestStatusUpdate[] = [
        {
          createdAtDate: '20200522',
          createdAtTime: '223443',
          orderRequestStatus: 'SCHEDULED',
        },

    ];

    const serviceOrderEventsCanceled: IServiceOrderEvent[] = [
      {
        appointment: {
          date: '2020-05-22',
          slotType: 'AM',
        },
        latestStatus: {
          createdAtDate: '20200522',
          createdAtTime: '223443',
          serviceOrderEventStatus: 'CANCELED',
        },
        product: 'EFR_D1',
        serviceOrderCategory: null,
        serviceOrderId: 'abc123',
      },
    ];

    const orderRequest = {
      ...serviceRequest,
      orderRequestStatusUpdates: orderStatusNotCanceled,
      serviceOrderEvents: serviceOrderEventsCanceled
    };

    expect(getCompletedStep('2020-07-25', orderRequest)).toEqual({
      description: '',
      key: 'Completed',
      status: StepperStatus.Pending,
      title: <FormattedMessage {...messages.completed} />,
    });
  });
});
