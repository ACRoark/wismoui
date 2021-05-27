import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import useConfig from 'hooks/useConfig';

import './index.less';
import messages from './messages';

const currentYear = new Date().getFullYear();

const Footer: React.FC = (): React.ReactElement => {
  const { urls } = useConfig();

  return (
    <footer className="dte-wismo-footer">
      <div className="dte-wismo-footer-content">
        <div className="dte-wismo-footer-links">
          <a href={urls.privacyPolicy}>
            <FormattedMessage {...messages.privacyPolicy} />
          </a>
          <p className="dte-wismo-footer-divider">|</p>
          <a href={urls.termsAndConditions}>
            <FormattedMessage {...messages.termsAndConditions} />
          </a>
          <p className="dte-wismo-footer-divider">|</p>
          <a href={urls.contactUs}>
            <FormattedMessage {...messages.contactUs} />
          </a>
        </div>
        <div className="dte-wismo-footer-copyright">
          <p>
            <FormattedMessage {...messages.allRightsReserved} values={{ year: currentYear }} />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
