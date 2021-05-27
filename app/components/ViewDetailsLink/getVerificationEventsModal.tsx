import * as _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import DateStamp from 'components/DateStamp';
import DteContactNumber from 'components/DteContactNumber';
import VerificationHistory from 'components/Timelines/VerificationHistory';
import useConfig from 'hooks/useConfig';
import encryptionApiClient from 'services/encryptionApiClient';
import IModalConfig from 'types/IModalConfig';
import IVerificationEvent from 'types/IVerificationEvent';

import getDteContactNumber from './getDteContactNumber';
import './index.less';
import messages from './messages';

const getVerificationEventsModal = (events: IVerificationEvent[], orderCreatedDate: string): IModalConfig => {
  let category;
  let code;
  const [encryptedVerificationEventId, setEncryptedVerificationEventId] = useState('');
  const formattedOrderCreatedDate = orderCreatedDate && <DateStamp value={orderCreatedDate} />;
  let modalContent;
  let modalTitle;
  let showVerificationHistory;
  let verificationEventId;

  if (events && events.length) {
    const lastVerificationEvent = _.last(events);
    category = lastVerificationEvent.verificationCategory;
    code = _.last(lastVerificationEvent.verificationEventStatusUpdates).verificationCode;
    modalTitle = <FormattedMessage {...messages[`${code}_title`]} />;
    verificationEventId = lastVerificationEvent.verificationEventId;

    const contactNumber = getDteContactNumber(category);
    showVerificationHistory = !['AP', 'PM', 'WP'].includes(code);
    const { urls } = useConfig();

    // append the tokenized verification event ID to the url.documentSubmission here
    useEffect((): void => {
      if (verificationEventId) {
        const getEncryptedVerificationEventId = async (): Promise<void> => {
          const encryptedTokenValue = await encryptionApiClient.encryptTokenAsync(
            urls.encryptTokenApi,
            verificationEventId,
          );

          setEncryptedVerificationEventId(encryptedTokenValue);
        };

        getEncryptedVerificationEventId();
      }
    }, []);

    const appendedDocumentSubmissionUrl = `${urls.documentSubmission}${encryptedVerificationEventId}`;

    modalContent = (
      <span className="dte-wismo-view-details-modal-content">
        <FormattedMessage
          {...messages[`${code}_${category}_description`]}
          values={{
            a: (chunks: React.ReactNode): React.ReactNode => (
              <a className="website" href={appendedDocumentSubmissionUrl} target="_blank">
                {chunks}
              </a>
            ),
            assistance: (...msg: React.ReactNode[]): React.ReactNode => (
              <a className="website" href={urls.assistanceURL} target="_blank">
                {msg}
              </a>
            ),
            li: (...msg: React.ReactNode[]): React.ReactNode => <li>{msg}</li>,
            login: (...msg: React.ReactNode[]): React.ReactNode => (
              <a className="website" href={urls.signIn} target="_blank">
                {msg}
              </a>
            ),
            p: (...msg: React.ReactNode[]): React.ReactNode => <p>{msg}</p>,
            ol: (...msg: React.ReactNode[]): React.ReactNode => <ol>{msg}</ol>,
            mimo: (...msg: React.ReactNode[]): React.ReactNode => (
              <a className="website" href={urls.backToMIMO} target="_blank">
                {msg}
              </a>
            ),
            orderCreatedDate: formattedOrderCreatedDate,
            ul: (...msg: React.ReactNode[]): React.ReactNode => <ul>{msg}</ul>,
            phoneNumber: <DteContactNumber value={contactNumber} />,
          }}
        />
        {showVerificationHistory && (
          <>
            <span className="dte-wismo-view-details-status-history-title">
              <FormattedMessage {...messages.status_history_title} />
            </span>
            <VerificationHistory verificationEvents={events} />
          </>
        )}
      </span>
    );
  }

  return {
    className: 'dte-wismo-modal',
    content: modalContent,
    title: modalTitle,
  };
};

export default getVerificationEventsModal;
