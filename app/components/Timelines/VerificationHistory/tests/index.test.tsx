import React from 'react';

import { SUPPORTED_LOCALES } from 'locales';

import { createSnapshotWithIntl, renderWithIntl } from 'testing/utils';
import IVerificationEvent from 'types/IVerificationEvent';

import VerificationHistory from '..';

const completedVerificationEvents: IVerificationEvent[] = [
  {
    verificationCategory: 'R975',
    verificationEventId: '123123',
    verificationEventStatusUpdates: [
      {
        verificationCode: 'AD',
        verificationEventStatus: 'ACTIVE',
        createdAtDate: '20200320',
        createdAtTime: '092215',
      },
      {
        verificationCode: 'AD',
        verificationEventStatus: 'COMPLETED',
        createdAtDate: '20200321',
        createdAtTime: '092215',
      },
      {
        verificationCode: 'PR',
        verificationEventStatus: 'ACTIVE',
        createdAtDate: '20200321',
        createdAtTime: '122215',
      },
      {
        verificationCode: 'PR',
        verificationEventStatus: 'COMPLETED',
        createdAtDate: '20200321',
        createdAtTime: '142215',
      },
    ],
  },
];

const incompleteVerificationEvents: IVerificationEvent[] = [
  {
    verificationCategory: 'R975',
    verificationEventId: '123123',
    verificationEventStatusUpdates: [
      {
        verificationCode: 'AD',
        verificationEventStatus: 'ACTIVE',
        createdAtDate: '20200320',
        createdAtTime: '092215',
      },
      {
        verificationCode: 'AD',
        verificationEventStatus: 'COMPLETED',
        createdAtDate: '20200321',
        createdAtTime: '092215',
      },
      {
        verificationCode: 'PR',
        verificationEventStatus: 'ACTIVE',
        createdAtDate: '20200321',
        createdAtTime: '122215',
      },
    ],
  },
];

const expectComponentToMatchSnapshot = (orderVerificationEvents: IVerificationEvent[], language: string): void => {
  const tree = createSnapshotWithIntl(<VerificationHistory verificationEvents={orderVerificationEvents} />, language);

  expect(tree).toMatchSnapshot();
};

const shouldNotLogErrors = (language: string, orderVerificationEvents: IVerificationEvent[]): void => {
  const spy = jest.spyOn(global.console, 'error');

  renderWithIntl(<VerificationHistory verificationEvents={orderVerificationEvents}/>, language);

  expect(spy).not.toHaveBeenCalled();
};

describe('VerificationHistory', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    it(`should not log errors in console when language is (${language}) and verification events has items in 'COMPLETED' status`, (): void =>
      shouldNotLogErrors(language, completedVerificationEvents));

    it(`should not log errors in console when language is (${language}) and verification events has no items in 'COMPLETED' status`, (): void =>
      shouldNotLogErrors(language, incompleteVerificationEvents));

    it(`should show verification events history when language is ${language} and verification events has items in 'COMPLETED' status`, (): void =>
      expectComponentToMatchSnapshot(completedVerificationEvents, language));

    it(`should show verification events history when language is ${language} and verification events has last item in 'ACTIVE' status`, (): void =>
      expectComponentToMatchSnapshot(incompleteVerificationEvents, language));
  });
});
