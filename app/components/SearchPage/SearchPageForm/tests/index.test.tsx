import React from 'react';
import { Provider } from 'react-redux';
import routeData from 'react-router';

import { SUPPORTED_LOCALES } from 'locales';

import { createMockStore, createSnapshotWithIntl  } from 'testing/utils';
import SearchPageForm from '..';

const store = createMockStore();

const errors = ['ORDER_INACTIVE', 'ORDER_INVALID', 'ORDER_NOT_FOUND', 'RECAPTCHA_FAILED', 'SERVER_UNAVAILABLE', 'well this was unexpected' ];

const mockLocation = {
  pathname: '/welcome',
  hash: '',
  search: '',
  state: ''
};

beforeEach((): void => {
  jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation);
});

const testSearchPageFormSnapshotWithError = ( error: string, language: string): void => {
  const tree = createSnapshotWithIntl(<Provider store={store}><SearchPageForm error={error} /></Provider>, language);

  expect(tree).toMatchSnapshot();
};

const testSearchPageFormSnapshotWithOutError = (language: string): void => {
  const tree = createSnapshotWithIntl(<Provider store={store}><SearchPageForm /></Provider>, language);

  expect(tree).toMatchSnapshot();
};

describe('<SearchPageForm />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    errors.forEach((error: string): void => {
      it(`should render correctly when error is ${error} and language is ${language}`, (): void => {
        testSearchPageFormSnapshotWithError(error, language);
      });
    });

    it(`should render correctly when language is ${language}`, (): void => {
      testSearchPageFormSnapshotWithOutError( language);
    });
  });
});
