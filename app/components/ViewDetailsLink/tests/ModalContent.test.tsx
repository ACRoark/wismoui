import React from 'react';

import { testConfig } from 'components/constants';
import useConfig from 'hooks/useConfig';
import { SUPPORTED_LOCALES } from 'locales';
import encryptionApiClient from 'services/encryptionApiClient';
import { createSnapshotWithIntl } from 'testing/utils';
import { IVerificationEvent } from 'types';

import ModalContent from '../ModalContent';

jest.mock('hooks/useConfig');
jest.mock('services/encryptionApiClient');

const mockConfig = useConfig as jest.MockedFunction<typeof useConfig>;
const mockEncryption = encryptionApiClient.encryptTokenAsync as jest.MockedFunction<typeof encryptionApiClient.encryptTokenAsync>;

const expectComponentToMatchSnapshot = (event: IVerificationEvent, events: IVerificationEvent[], language: string, orderCreatedDate: string): void => {
  const tree = createSnapshotWithIntl(<ModalContent event={event} events={events} orderCreatedDate={orderCreatedDate} />, language);

  expect(tree).toMatchSnapshot();
};

describe('ModalContent', (): void => {
  mockConfig.mockReturnValue({ ...testConfig });
  mockEncryption.mockReturnValue(new Promise((): string => ''));

  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    it('should render the modal content for AD', (): void => {
      const multipleBpemVerificationEvents: IVerificationEvent[] = [
        {
          verificationCategory: 'R975',
          verificationEventId: '123111',
          verificationEventStatusUpdates: [
            {
              createdAtDate: '20201005',
              createdAtTime: '091510',
              verificationCode: 'AD',
              verificationEventStatus: 'ACTIVE',
            },
          ],
        },
        {
          verificationCategory: 'R980',
          verificationEventId: '123112',
          verificationEventStatusUpdates: [
            {
              createdAtDate: '20201005',
              createdAtTime: '092010',
              verificationCode: 'PR',
              verificationEventStatus: 'ACTIVE',
            },
          ],
        },
      ];

      expectComponentToMatchSnapshot(multipleBpemVerificationEvents[0], multipleBpemVerificationEvents, language, '2020-04-19');
    });

    it('should render the modal content for AP', (): void => {
      const multipleBpemVerificationEvents: IVerificationEvent[] = [
        {
          verificationCategory: 'R975',
          verificationEventId: '123111',
          verificationEventStatusUpdates: [
            {
              createdAtDate: '20201005',
              createdAtTime: '091510',
              verificationCode: 'AP',
              verificationEventStatus: 'ACTIVE',
            },
          ],
        },
        {
          verificationCategory: 'R980',
          verificationEventId: '123112',
          verificationEventStatusUpdates: [
            {
              createdAtDate: '20201005',
              createdAtTime: '092010',
              verificationCode: 'PR',
              verificationEventStatus: 'ACTIVE',
            },
          ],
        },
      ];

      expectComponentToMatchSnapshot(multipleBpemVerificationEvents[0], multipleBpemVerificationEvents, language, '2020-04-19');
    });
  });
});
