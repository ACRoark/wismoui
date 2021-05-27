/**
 *
 * Tests for LoadingIndicator
 *
 */
import { render } from 'enzyme';
import React from 'react';

import LoadingIndicator from '..';

describe('<LoadingIndicator />', (): void => {
  it('should not log errors in console when rendered', (): void => {
    const spy = jest.spyOn(global.console, 'error');

    render(<LoadingIndicator />);

    expect(spy).not.toHaveBeenCalled();
  });
});
