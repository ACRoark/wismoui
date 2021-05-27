import React from 'react';
import { Provider } from 'react-redux';

import { SUPPORTED_LOCALES } from 'locales';

import { createMockStore, createSnapshotWithIntl  } from 'testing/utils';
import SearchFormError from '..';

const inactiveError = 'ORDER_INACTIVE';
const invalidError = 'ORDER_INVALID';
const orderNotFoundError = 'ORDER_NOT_FOUND';
const recaptchaError = 'RECAPTCHA_FAILED';
const unavailableError = 'SERVER_UNAVAILABLE';
const unexpectedError = 'well this was unexpected';

const store = createMockStore();

const testSearchFormErrorSnapshot = ( error: string, language: string): void => {
  const tree = createSnapshotWithIntl(<Provider store={store}><SearchFormError error={error} /></Provider>, language);

  expect(tree).toMatchSnapshot();
};

describe('<SearchFormError />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    it(`should render correctly when a google reCAPTCHA error occurs and language is ${language}`, (): void => {
      testSearchFormErrorSnapshot(recaptchaError, language);
    });

    it(`should render correctly when an inactive order error occurs and language is ${language}`, (): void => {
      testSearchFormErrorSnapshot(inactiveError, language);
    });

    it(`should render correctly when an invalid order error occurs and language is ${language}`, (): void => {
      testSearchFormErrorSnapshot(invalidError, language);
    });

    it(`should render correctly when an order not found error occurs and language is ${language}`, (): void => {
      testSearchFormErrorSnapshot(orderNotFoundError, language);
    });

    it(`should render correctly when an unavailable server error occurs and language is ${language}`, (): void => {
      testSearchFormErrorSnapshot(unavailableError, language);
    });

    it(`should render correctly when an unexpected error occurs and language is ${language}`, (): void => {
      testSearchFormErrorSnapshot(unexpectedError, language);
    });
  });
});
