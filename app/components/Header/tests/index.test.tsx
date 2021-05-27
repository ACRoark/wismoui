import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RawIntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { SUPPORTED_LOCALES } from 'locales';

import { testConfig } from 'components/constants';
import useConfig from 'hooks/useConfig';
import { createMockStore, createSnapshotWithIntl, shallowWithIntl } from 'testing/utils';
import createIntlShape from 'testing/utils/createIntlShape';

import Header from '..';

jest.mock('hooks/useConfig');

const mockConfig = useConfig as jest.MockedFunction<typeof useConfig>;

describe('<Header />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);
  const store = createMockStore();

  mockConfig.mockReturnValue({ ...testConfig });

  languages.forEach((language: string): void => {
    it(`should not log errors in console when rendered in ${language}`, (): void => {
      const spy = jest.spyOn(global.console, 'error');

      shallowWithIntl(<Provider store={store}><Header /></Provider>, language);

      expect(spy).not.toHaveBeenCalled();
    });

    it(`should render correctly when the current language is ${language}`, (): void => {
      const tree = createSnapshotWithIntl(<Provider store={store}><Header /></Provider>, language);

      expect(tree).toMatchSnapshot();
    });
  });

  it('should render correctly when opening and closing the mobile menu', (): void => {
    const intl = createIntlShape('en');

    render(<Router><RawIntlProvider value={intl}><Provider store={store}><Header /></Provider></RawIntlProvider></Router>);

    expect(screen.queryByTestId('mobile-menu')).toBeNull();

    fireEvent.click(screen.getByTestId('open-mobile-menu'));

    expect(screen.getByTestId('mobile-menu')).toBeTruthy();

    fireEvent.click(screen.getByTestId('close-mobile-menu'));

    expect(screen.queryByTestId('mobile-menu')).toBeNull();
  });

  it('should render correctly when opening and closing the mobile menu using the overlay', (): void => {
    const intl = createIntlShape('en');

    render(<Router><RawIntlProvider value={intl}><Header /></RawIntlProvider></Router>);

    expect(screen.queryByTestId('mobile-menu')).toBeNull();

    fireEvent.click(screen.getByTestId('open-mobile-menu'));

    expect(screen.getByTestId('mobile-menu')).toBeTruthy();

    fireEvent.click(screen.getByTestId('close-mobile-menu-overlay'));

    expect(screen.queryByTestId('mobile-menu')).toBeNull();
  });
});
