/**
 *
 * Tests for InvalidServiceView
 *
 */
import { render } from 'enzyme';
import React from 'react';

import InvalidServiceView from '..';

describe('<InvalidServiceView />', (): void => {
  it('should not log errors in console when rendered', (): void => {
    const spy = jest.spyOn(global.console, 'error');

    render(<InvalidServiceView />);

    expect(spy).not.toHaveBeenCalled();
  });
});
