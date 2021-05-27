
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Provider } from 'react-redux';

import { testConfig } from 'components/constants';
import useConfig from 'hooks/useConfig';
import useModal from 'hooks/useModal';
import {  ModalProvider } from 'providers/ModalProvider';
import { createMockStore, createSnapshotWithIntl } from 'testing/utils';
import IModalConfig from 'types/IModalConfig';

import ViewSubstatusDetailsLink from '../ViewSubstatusDetailsLink';

import { SUPPORTED_LOCALES } from 'locales';
import messages from '../messages';

jest.mock('hooks/useConfig');
jest.mock('hooks/useModal');

const mockConfig = useConfig as jest.MockedFunction<typeof useConfig>;
const mockModal = useModal as jest.MockedFunction<typeof useModal>;

const modalTitle = <FormattedMessage {...messages.DELAYED_title} />;

const modalContentForServiceOrderEvents = (
  <span className="dte-wismo-view-details-modal-content">
      <FormattedMessage
        {...messages.DELAYED_description}
        values={{
          phoneNumber: (
            <a className="phone-number" href="tel:+8004774747">
              800.477.4747
            </a>
          ),
          website: (
            <a href={'http://www.doo-dee-doo.com'}>
              <FormattedMessage {...messages.website} />
            </a>
          ),
        }}
      />
    </span>
);

const modalConfigForServiceOrderEvents: IModalConfig = {
  content: modalContentForServiceOrderEvents,
  title: modalTitle,
};

const expectComponentToMatchSnapshotForServiceOrderEvents = (language: string): void => {
  mockConfig.mockReturnValue({ ...testConfig });
  mockModal.mockReturnValue({
    hideModal: jest.fn(),
    showModal: jest.fn(),
  });

  const tree = createSnapshotWithIntl(
    <Provider store={createMockStore()}>
       <ModalProvider {...modalConfigForServiceOrderEvents}>
         <ViewSubstatusDetailsLink modal={modalConfigForServiceOrderEvents} />
       </ModalProvider>
    </Provider>, language);

  expect(tree).toMatchSnapshot();
};

describe('<ViewDetailsLink2 />', (): void => {

  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {

    it(`should render the link when a valid serviceOrderEvents and serviceOrderEventStatus are provided (${language})`, (): void =>
      expectComponentToMatchSnapshotForServiceOrderEvents(language));
  });
});
