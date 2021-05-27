import React, { FC, ReactElement, RefObject, SyntheticEvent, useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import InputMask from 'react-input-mask';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router-dom';

import useConfig from 'hooks/useConfig';
import useFlags from 'hooks/useFlags';
import useThunkDispatch from 'hooks/useThunkDispatch';
import encryptionApiClient from 'services/encryptionApiClient';
import { findOrder, resetTracker } from 'store/actions';
import SearchFormError from '../SearchFormError';
import getEncodedName from './getEncodedName';
import messages from './messages';

import './index.less';

interface ISearchPageFormProps {
  error?: string;
}

const SearchPageForm: FC<ISearchPageFormProps> = (props: ISearchPageFormProps): ReactElement => {
  const { error } = props;

  const { bug2263 } = useFlags();

  const dispatch = useThunkDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const [name, setName] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const { search: queryParameter = '' } = useLocation();
  const recaptchaRef: RefObject<any> = React.createRef(); // tslint:disable-line
  const {
    recaptchaSitekey,
    urls: { decryptTokenApi },
  } = useConfig();
  const [recaptchaToken, setRecaptchaToken] = useState('');

  const handleDisabled = (): void =>
    name.length && orderNumber.length && recaptchaToken ? setIsDisabled(false) : setIsDisabled(true);

  const handleNameChange = (event: SyntheticEvent): void => {
    const element = event.target as HTMLInputElement;

    setName(element.value);
  };

  const handleOrderNumberChange = (event: SyntheticEvent): void => {
    const element = event.target as HTMLInputElement;

    setOrderNumber(element.value);
  };

  const handleSubmit = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();

    dispatch(findOrder(orderNumber.replace(/\s/g, ''), getEncodedName(name), recaptchaToken, bug2263));
    setIsDisabled(true);
  };

  const recaptchaOnChange = (value: string): void => {
    setRecaptchaToken(value || '');
    dispatch(resetTracker());
  };

  useEffect((): void => {
    if (queryParameter) {
      const setDecryptedOrderNumber = async (): Promise<void> => {
        const decryptedOrderNumber = await encryptionApiClient.decryptTokenAsync(decryptTokenApi, queryParameter);

        setOrderNumber(decryptedOrderNumber);
      };

      setDecryptedOrderNumber();
    }
  }, []);

  useEffect((): void => {
    handleDisabled();
  }, [recaptchaToken, name, orderNumber]);

  useEffect((): void => {
    if (error && recaptchaRef.current) {
      recaptchaRef.current.reset();
      setRecaptchaToken('');
    }
  }, [error]);

  return (
    <form
      className="dte-wismo-search-page-form"
      id="mimotrackerguestsearch"
      name="mimotrackerguestsearch"
      onSubmit={handleSubmit}
    >
      <h1 className="title">
        <FormattedMessage {...messages.title} />
      </h1>

      <label htmlFor="name">
        <div className="dte-wismo-search-page-form-input-header">
          <FormattedMessage {...messages.name} />
        </div>
        <input name="name" type="text" value={name} onChange={handleNameChange} />
      </label>

      <label htmlFor="order-number">
        <div className="dte-wismo-search-page-form-input-header">
          <FormattedMessage {...messages.orderNumber} />
        </div>
        <InputMask
          mask="** **** ****"
          maskChar={null}
          name="order-number"
          onChange={handleOrderNumberChange}
          value={orderNumber}
        />
      </label>

      <ReCAPTCHA className="recaptcha" ref={recaptchaRef} sitekey={recaptchaSitekey} onChange={recaptchaOnChange} />

      {error && <SearchFormError error={error} />}

      <button
        className="button"
        data-track="mimo"
        data-track-detail="order tracker"
        data-track-action="click"
        data-track-sub-action="guest search"
        type="submit"
        disabled={isDisabled}
      >
        <FormattedMessage {...messages.button} />
      </button>
    </form>
  );
};

export default SearchPageForm;
