import { render } from 'enzyme';
import React from 'react';

import { createSnapshot } from 'testing/utils';

import CustomerName from '..';

describe('<AccountNumber />', (): void => {
  it('should not log errors in console when rendered', (): void => {
    const spy = jest.spyOn(global.console, 'error');

    render(<CustomerName name="Test Test" />);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should render correctly', (): void => {
    const tree = createSnapshot(<CustomerName name="Test Test" />);

    expect(tree).toMatchSnapshot();
  });
});
