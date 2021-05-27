import { render } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { createMockStore } from 'testing/utils';

import App from '..';

const store = createMockStore();

describe('<App />', (): void => {
  it('should not log errors in console when rendered', (): void => {
    const spy = jest.spyOn(global.console, 'error');

    render(<Provider store={store}><MemoryRouter><App /></MemoryRouter></Provider>);

    expect(spy).not.toHaveBeenCalled();
  });
});
