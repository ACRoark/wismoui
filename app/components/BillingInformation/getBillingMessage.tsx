import React from 'react';
import { FormattedMessage } from 'react-intl';

import IUrlConfig from 'types/IUrlConfig';

import messages from './messages';

const getBillingMessage = (
  urls: IUrlConfig,
  requestType: string,
  authenticated: boolean,
): React.ReactElement => {

  const GuestPayLink = (
    <a href={urls.guestPay}>
      <FormattedMessage {...messages.guestPayLink} />
    </a>
  );

  const SignInLink = (
    <a href={urls.signIn}>
      <FormattedMessage {...messages.signInLink} />
    </a>
  );

  if (authenticated) {
    return (
      <FormattedMessage
        {...messages.authenticatedUsers}
        values={{
          a: (chunks: React.ReactNode): React.ReactNode => (
            <a href={urls.signIn} target="_blank">
              {chunks}
            </a>
          ),
        }}
      />
    );
  }

  return (
    <FormattedMessage
      {...messages[requestType]}
      values={{
        guestPay: GuestPayLink,
        signIn: SignInLink,
      }}
    />
  );
};

export default getBillingMessage;
