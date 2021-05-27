import { render } from 'enzyme';
import React from 'react';

import { createSnapshot } from 'testing/utils';

import DteContactNumber from '..';

const expectComponentToMatchSnapshot = (value?: string): void => {
  const tree = createSnapshot(<DteContactNumber value={value} />);

  expect(tree).toMatchSnapshot();
};

describe('<DteContactNumber />', (): void => {
  it('should not log errors in console when rendered', (): void => {
    const spy = jest.spyOn(global.console, 'error');

    render(<DteContactNumber />);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should render correctly when value is 8004774747', (): void =>
    expectComponentToMatchSnapshot('8004774747'));
});
