import * as _ from 'lodash';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import DateStamp from 'components/DateStamp';
import DteContactNumber from 'components/DteContactNumber';
import VerificationHistory from 'components/Timelines/VerificationHistory';
import useConfig from 'hooks/useConfig';
import encryptionApiClient from 'services/encryptionApiClient';
import { IVerificationEvent } from 'types';

import getDteContactNumber from './getDteContactNumber';
import messages from './messages';

interface IModalContentProps {
  event: IVerificationEvent;
  events: IVerificationEvent[];
  orderCreatedDate: string;
}

const ModalContent: FC<IModalContentProps> = (props: IModalContentProps): ReactElement => {
  const { event, events, orderCreatedDate } = props;

  const { urls } = useConfig();
  const [encryptedVerificationEventId, setEncryptedVerificationEventId] = useState('');

  const category = event?.verificationCategory;
  const code = _.last(event?.verificationEventStatusUpdates).verificationCode;
  const contactNumber = getDteContactNumber(category);
  const formattedOrderCreatedDate = orderCreatedDate && <DateStamp key={orderCreatedDate} value={orderCreatedDate} />;
  const showVerificationHistory = !['AP', 'PM', 'WP'].includes(code);
  const verificationEventId = event?.verificationEventId;

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

  return (
    <span className="dte-wismo-view-details-modal-content">
      <FormattedMessage
        {...messages[`${code}_${category}_description`]}
        values={{
          a: (...msg: React.ReactNode[]): React.ReactNode => (
            <a
              className="website"
              href={appendedDocumentSubmissionUrl}
              key={`${code}${category}${msg}`}
              target="_blank"
            >
              {msg}
            </a>
          ),
          assistance: (...msg: React.ReactNode[]): React.ReactNode => (
            <a className="website" href={urls.assistanceURL} key={`${code}${category}${msg}`} target="_blank">
              {msg}
            </a>
          ),
          li: (...msg: React.ReactNode[]): React.ReactNode => <li key={`${code}${category}${msg}`}>{msg}</li>,
          login: (...msg: React.ReactNode[]): React.ReactNode => (
            <a className="website" href={urls.signIn} key={`${code}${category}${msg}`} target="_blank">
              {msg}
            </a>
          ),
          p: (...msg: React.ReactNode[]): React.ReactNode => <p key={`${code}${category}${msg}`}>{msg}</p>,
          ol: (...msg: React.ReactNode[]): React.ReactNode => <ol key={`${code}${category}${msg}`}>{msg}</ol>,
          mimo: (...msg: React.ReactNode[]): React.ReactNode => (
            <a className="website" href={urls.backToMIMO} key={`${code}${category}${msg}`} target="_blank">
              {msg}
            </a>
          ),
          orderCreatedDate: formattedOrderCreatedDate,
          ul: (...msg: React.ReactNode[]): React.ReactNode => <ul key={`${code}${category}${msg}`}>{msg}</ul>,
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
};

export default ModalContent;
