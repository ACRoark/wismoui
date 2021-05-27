import React from 'react';
import { Provider } from 'react-redux';
import { createMockStore, createSnapshotWithIntl } from 'testing/utils';

import { IServiceOrderEvent } from 'types';

import AppointmentList from '../AppointmentList';

const store = createMockStore();

describe('AppointmentList', (): void => {
  it('should return an appointment date and the appointment times when completed is false', (): void => {
    const appointments: IServiceOrderEvent[] = [
      {
        appointment: {
          date: '20200925',
          slotType: 'AM',
        },
        latestStatus: {
          createdAtDate: '20200922',
          createdAtTime: '140205',
          serviceOrderEventStatus: 'ON_SCHEDULE',
        },
        product: 'EFR_D1',
        serviceOrderCategory: 'SDI1',
        serviceOrderId: '800008161708',
      },
      {
        appointment: {
          date: '20200925',
          slotType: 'AM',
        },
        latestStatus: {
          createdAtDate: '20200922',
          createdAtTime: '140209',
          serviceOrderEventStatus: 'ON_SCHEDULE',
        },
        product: 'GFR_AS_H',
        serviceOrderCategory: 'SDI1',
        serviceOrderId: '800008161709',
      },
    ];

    const date = '20200925';

    const tree = createSnapshotWithIntl(
      <Provider store={store}>
        <AppointmentList
          appointments={appointments}
          completed={false}
          date={date}
          key={date}
          showEditLink={false}
        />
      </Provider>
    );

    expect(tree).toMatchSnapshot();
  });

  it('should return completed content when completed is true', (): void => {
    const appointments: IServiceOrderEvent[] = [
      {
        appointment: {
          date: '20200925',
          slotType: 'AM',
        },
        latestStatus: {
          createdAtDate: '20200922',
          createdAtTime: '140205',
          serviceOrderEventStatus: 'COMPLETED',
        },
        product: 'EFR_D1',
        serviceOrderCategory: 'SDI1',
        serviceOrderId: '800008161708',
      },
      {
        appointment: {
          date: '20200925',
          slotType: 'AM',
        },
        latestStatus: {
          createdAtDate: '20200922',
          createdAtTime: '140209',
          serviceOrderEventStatus: 'COMPLETED',
        },
        product: 'GFR_AS_H',
        serviceOrderCategory: 'SDI1',
        serviceOrderId: '800008161709',
      },
    ];

    const date = '20200925';

    const tree = createSnapshotWithIntl(
      <Provider store={store}>
        <AppointmentList
          appointments={appointments}
          completed
          date={date}
          key={date}
          showEditLink={false}
        />
      </Provider>
    );

    expect(tree).toMatchSnapshot();
  });
});
