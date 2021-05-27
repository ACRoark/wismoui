/* eslint-disable global-require */
import React, { FC, ReactElement, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import Hyperlink from 'components/Hyperlink';
import useConfig from 'hooks/useConfig';
import CloseIcon from 'images/CloseIcon';
import DteLogo from 'images/DteLogo';
import HamburgerMenu from 'images/HamburgerMenu';

import './index.less';
import messages from './messages';

const Header: FC = (): ReactElement => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { urls } = useConfig();

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="dte-wismo-header-background">
      <div className="dte-wismo-header-mobile">
        <button
          className="dte-wismo-header-mobile-hamburger"
          data-testid="open-mobile-menu"
          onClick={toggleMobileMenu}
          type="button"
        >
          <HamburgerMenu title="menu" />
        </button>
        {isMobileMenuOpen && (
          <>
            <div
              aria-label="overlay"
              className="dte-wismo-header-mobile-menu-background-overlay"
              data-testid="close-mobile-menu-overlay"
              onClick={toggleMobileMenu}
              onKeyPress={toggleMobileMenu}
              role="button"
              tabIndex={0}
            />
            <div className="dte-wismo-header-mobile-menu" data-testid="mobile-menu">
              <div className="dte-wismo-header-mobile-menu-submenu dte-wismo-header-mobile-menu-submenu-top">
                <button
                  className="dte-wismo-header-mobile-menu-button"
                  data-testid="close-mobile-menu"
                  onClick={toggleMobileMenu}
                  type="button"
                >
                  <CloseIcon title="Close mobile menu" />
                </button>
                <Hyperlink href="/">
                  <FormattedMessage {...messages.serviceRequestsLink} />
                </Hyperlink>
              </div>
              <div className="dte-wismo-header-mobile-menu-submenu dte-wismo-header-mobile-menu-submenu-bottom">
                <Hyperlink href={urls.backToDTE} target="_self">
                  <FormattedMessage {...messages.link} />
                </Hyperlink>
              </div>
            </div>
          </>
        )}
        <div className="dte-wismo-header-mobile-center">
          <div className="dte-wismo-header-mobile-logo">
            <a href={urls.headerLogo} title="DTE Energy">
              <DteLogo className="dte-wismo-header-logo" title="DTE Energy" />
            </a>
          </div>
          <div className="dte-wismo-header-page-title">
            <FormattedMessage {...messages.title} />
          </div>
        </div>
      </div>

      <div className="dte-wismo-header">
        <div className="dte-wismo-header-page-title">
          <FormattedMessage {...messages.title} />
        </div>
        <div>
          <a href={urls.headerLogo} title="DTE Energy">
            <DteLogo className="dte-wismo-header-logo" title="DTE Energy" />
          </a>
        </div>
        <div className="dte-wismo-header-link">
          <Hyperlink href={urls.backToDTE} target="_self">
            <FormattedMessage {...messages.link} />
          </Hyperlink>
        </div>
      </div>
    </header>
  );
};

export default Header;
