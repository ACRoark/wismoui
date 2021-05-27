import { render } from 'enzyme';
import React from 'react';

import { createSnapshot } from 'testing/utils';

import AccountNumber from '..';

describe('<AccountNumber />', (): void => {
  it('should not log errors in console when rendered', (): void => {
    const spy = jest.spyOn(global.console, 'error');

    render(<AccountNumber value="112233445566" />);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should render correctly when passed a valid account number value', (): void => {
    const tree = createSnapshot(<AccountNumber value="112233445566" />);

    expect(tree).toMatchSnapshot();
  });
});
