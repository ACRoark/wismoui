import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';
import ColumnLayout from 'components/ColumnLayout';

import messages from './messages';

import './index.less';

const NotFoundPage: React.FC = (): React.ReactElement => {
  const onButtonClick = (): void => {
    window.location.href = document.referrer;
  };

  return (
    <ColumnLayout>
      <div className="dte-wismo-not-found-page">
        <div className="image">
          <svg width="137" height="181" viewBox="0 0 137 181" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M76.7802 167.987C82.8022 175.52 92.5879 180.04 103.126 180.04C121.945 180.04 137 164.974 137 146.141C137 132.582 129.473 121.282 118.181 116.009V43.6917L81.2966 0H12.7967C6.02196 0 0 5.27322 0 12.8063V155.934C0 162.714 5.26916 168.74 12.0439 168.74L76.7802 167.987ZM72.2637 161.96H12.7967C9.78569 161.96 6.77468 158.947 6.77468 155.934V12.8063C6.77468 9.79305 9.78569 6.77981 12.7967 6.77981H75.2747V37.6652C75.2747 44.445 80.5439 50.4715 87.3186 50.4715H112.159V113.749C109.148 112.996 106.137 112.242 103.126 112.242C84.3077 112.242 69.2527 127.309 69.2527 146.141C68.5 151.414 70.0054 156.687 72.2637 161.96ZM81.2966 9.79298L110.654 43.6917H87.3186C83.5549 43.6917 81.2966 40.6784 81.2966 37.6652V9.79298ZM103.126 174.013C87.3187 174.013 75.2747 161.207 75.2747 146.141C75.2747 131.075 88.0714 118.269 103.126 118.269C118.181 118.269 130.978 131.075 130.978 146.141C130.978 161.961 118.181 174.013 103.126 174.013ZM81.2966 143.128V149.154H124.956V143.128H81.2966Z"
              fill="#D9D9D9"
            />
          </svg>
        </div>
        <div className="titleRow">
          <div className="title">
            <FormattedMessage {...messages.title} />
          </div>
          <div className="divider">
            <hr />
          </div>
          <div className="subtitle">
            <FormattedMessage {...messages.subtitle} />
          </div>
        </div>
        <div className="message">
          <FormattedMessage {...messages.message} />
        </div>
        <Button className="button" type="primary" onClick={onButtonClick}>
          <FormattedMessage {...messages.backButtonText} />
        </Button>
      </div>
    </ColumnLayout>
  );
};

export default NotFoundPage;
