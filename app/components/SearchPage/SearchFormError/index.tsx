import React, { FC, ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import useThunkDispatch from 'hooks/useThunkDispatch';
import { resetTracker } from 'store/actions';

import messages from './messages';

import './index.less';

interface ISearchFormError {
  error: string;
}

const SearchFormError: FC<ISearchFormError> = (props: ISearchFormError): ReactElement => {
  const { error } = props;

  const dispatch = useThunkDispatch();

  const handleClick = (): void => {
    dispatch(resetTracker());
  };

  const getMessage = (errorMsg: string): ReactElement => {
    switch (errorMsg) {
      case 'ORDER_INACTIVE':
        return <FormattedMessage {...messages.inactive} />;

      case 'ORDER_INVALID':
        return <FormattedMessage {...messages.invalid} />;

      case 'ORDER_NOT_FOUND':
        return <FormattedMessage {...messages.orderNotFound} />;

      case 'RECAPTCHA_FAILED':
        return <FormattedMessage {...messages.recaptchaFailed} />;

      case 'SERVER_UNAVAILABLE':
        return <FormattedMessage {...messages.unavailable} />;

      default:
        return <FormattedMessage {...messages.unexpected} />;
    }
  };

  return (
    <div className="dte-wismo-search-form-error">
      <div className="message">
        <span className="icon">!</span>
        {getMessage(error)}
      </div>
      <button className="close-button" onClick={handleClick} type="button">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 1L10.0178 10.0166M10.0178 10.0166L18.9668 18.9644M10.0178 10.0166L19 1.03558M10.0178 10.0166L1.03318 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchFormError;
