import React from 'react';

import { render } from 'enzyme';
import { createSnapshot } from 'testing/utils';

import Content from '../index';

const Children = (): React.ReactElement => <div>Children</div>;

describe('<Content />', (): void => {
  it('should not log errors in console when rendered', (): void => {
    const spy = jest.spyOn(global.console, 'error');

    render(
      <Content>
        <Children/>
      </Content>
    );

    expect(spy).not.toHaveBeenCalled();
  });

  it('should render correctly when passed valid children', (): void => {
    const tree = createSnapshot(
      <Content>
        <Children/>
      </Content>
    );

    expect(tree).toMatchSnapshot();
  });
});
