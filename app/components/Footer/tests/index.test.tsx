import React from 'react';
import { Provider } from 'react-redux';

import { SUPPORTED_LOCALES } from 'locales';

import { testConfig } from 'components/constants';
import useConfig from 'hooks/useConfig';
import { createMockStore, createSnapshotWithIntl, renderWithIntl } from 'testing/utils';

import Footer from '..';

jest.mock('hooks/useConfig');

const mockConfig = useConfig as jest.MockedFunction<typeof useConfig>;

describe('<Footer />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);
  const store = createMockStore();

  mockConfig.mockReturnValue({ ...testConfig });

  languages.forEach((language: string): void => {
    it('should not log errors in console when rendered', (): void => {
      const spy = jest.spyOn(global.console, 'error');

      renderWithIntl(<Provider store={store}><Footer /></Provider>, language);

      expect(spy).not.toHaveBeenCalled();
    });

    it('should render correctly', (): void => {
      const tree = createSnapshotWithIntl(<Provider store={store}><Footer /></Provider>, language);

      expect(tree).toMatchSnapshot();
    });
  });
});
