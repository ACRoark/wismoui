import React from 'react';
import { Provider } from 'react-redux';

import { SUPPORTED_LOCALES } from 'locales';

import { ModalProvider } from 'providers/ModalProvider';
import { createMockStore, createSnapshotWithIntl } from 'testing/utils';
import { IServiceOrderEvent, ProductType, SlotType } from 'types';

import AppointmentRescheduled from '../AppointmentRescheduled';

const expectComponentToMatchSnapshot = (
  product: ProductType,
  slotType: SlotType,
  date: string,
): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);
  languages.forEach((language: string): void => {
    const tree = createSnapshotWithIntl(
      <Provider store={createMockStore()}>
        <ModalProvider>
          <AppointmentRescheduled product={product} slotType={slotType} date={date} />
        </ModalProvider>
      </Provider>, language
    );
    expect(tree).toMatchSnapshot();
  });
};

describe('<AppointmentResheduled />', (): void => {

  const serviceOrderEvents: IServiceOrderEvent[] = [
    {
      appointment: {
        date: '20200622',
        slotType: 'AM',
      },
      latestStatus: {
        createdAtDate: '20200622',
        createdAtTime: '223443',
        serviceOrderEventStatus: 'RESCHEDULED',
      },
      product: 'EFR_D1',
      serviceOrderCategory: null,
      serviceOrderId: 'abc123',
    },
  ];

  it('should render correctly when the required props are given', (): void => {
    const {appointment: {slotType, date}, product} = serviceOrderEvents[0];

    expectComponentToMatchSnapshot(product, slotType, date);
  });
});
