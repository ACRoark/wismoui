import React from 'react';

import { SUPPORTED_LOCALES } from 'locales';

import createFakeOrder from 'components/createFakeOrder';
import getBannerNotification from 'components/ServiceRequestBanner/getBannerNotification';
import {  IMessage } from 'components/ServiceRequestBanner/types';
import { createSnapshotWithIntl, renderWithIntl } from 'testing/utils';
import { IOrderRequest } from 'types';

import DefaultBanner from '../index';

const fakeStartService = createFakeOrder('MI1122223333');
const fakeStopService = createFakeOrder('MO2233334444');

const expectComponentToMatchSnapshot = (locale: string, message: IMessage): void => {
  const tree = createSnapshotWithIntl(<DefaultBanner message={message} />, locale);

  expect(tree).toMatchSnapshot();
};

describe('<DefaultBanner />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    it(`should not log errors in console when rendered with a Start Service request and the current language is ${language}`, (): void => {
      const spy = jest.spyOn(global.console, 'error');

      const { message } = getBannerNotification(fakeStartService.orderRequests[0]);

      renderWithIntl(<DefaultBanner message={message} />, language);

      expect(spy).not.toHaveBeenCalled();
    });

    it(`should render correctly when given a Start Service request and the current language is ${language}`, (): void => {
      const { message } = getBannerNotification(fakeStartService.orderRequests[0]);

      expectComponentToMatchSnapshot(language, message);
    });

    it(`should render correctly when given a Stop Service request and the current language is ${language}`, (): void => {
      const { message } = getBannerNotification(fakeStopService.orderRequests[0]);

      expectComponentToMatchSnapshot(language, message);
    });

    it(`should render correctly when given a Start Service request with multiple appointment dates and the current language is ${language}`, (): void => {
      const serviceRequest: IOrderRequest = {
        ...fakeStartService.orderRequests[0],
        serviceOrderEvents: [
          {
            appointment: {
              date: '20220522',
              slotType: 'AM',
            },
            latestStatus: {
              createdAtDate: '20200522',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'ON_SCHEDULE',
            },
            product: 'EFR_D1',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
          {
            appointment: {
              date: '20220523',
              slotType: 'PM',
            },
            latestStatus: {
              createdAtDate: '20200522',
              createdAtTime: '223443',
              serviceOrderEventStatus: 'ON_SCHEDULE',
            },
            product: 'GFR_AS_H',
            serviceOrderCategory: null,
            serviceOrderId: 'abc123',
          },
        ],
      };

      const { message } = getBannerNotification(serviceRequest);

      expectComponentToMatchSnapshot(language, message);
    });
  });
});
