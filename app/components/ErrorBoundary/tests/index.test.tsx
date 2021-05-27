import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import { mount } from 'enzyme';
import { createMockStore } from 'testing/utils';

import ErrorBoundary from '../index';

const store = createMockStore();

const ProblemComponent = (): React.ReactElement => {
  throw new Error('Error thrown from problem component');
};

const languages = ['en', 'es'];

describe('<ErrorBoundary/>', (): void => {
  languages.forEach((language: string): void => {
    it('should catch errors with componentDidCatch', (): void => {
      jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch');

      mount(
        <Provider store={store}>
          <IntlProvider locale={language}>
            <ErrorBoundary>
              <ProblemComponent/>
            </ErrorBoundary>
          </IntlProvider>
        </Provider>);

      expect(ErrorBoundary.prototype.componentDidCatch).toHaveBeenCalled();
    });

    it('should render props.children', (): void => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale={language}>
            <ErrorBoundary>
              <ProblemComponent/>
            </ErrorBoundary>
          </IntlProvider>
        </Provider>
      );
      expect(wrapper.find(<ProblemComponent/>));
    });
  });
});
