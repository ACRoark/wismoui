import { render } from 'enzyme';
import React from 'react';

import { createSnapshot } from 'testing/utils';

import Button, { ButtonTypes } from '..';

const expectButtonToMatchSnapshot = (type?: ButtonTypes, disabled?: boolean, dataTrackSubAction?: string): void => {

  const tree = createSnapshot(<Button disabled={disabled} type={type} dataTrackSubAction={dataTrackSubAction} />);

  expect(tree).toMatchSnapshot();
};

describe('<Button />', (): void => {

  it('should not log errors in console when rendered', (): void => {
      const spy = jest.spyOn(global.console, 'error');

      render(<Button type="primary" />);

      expect(spy).not.toHaveBeenCalled();
    });

  it('should render correctly when it is link', (): void => expectButtonToMatchSnapshot('link'));

  it('should render correctly when it is link and disabled', (): void => expectButtonToMatchSnapshot('link', true));

  it('should render correctly when it is primary', (): void => expectButtonToMatchSnapshot('primary'));

  it('should render correctly when it is primary and disabled', (): void => expectButtonToMatchSnapshot('primary', true));

  it('should render correctly when it is secondary', (): void => expectButtonToMatchSnapshot('secondary'));

  it('should render correctly when it is secondary and disabled', (): void => expectButtonToMatchSnapshot('secondary', true));

  it('should render correctly when the type is not specified', (): void => expectButtonToMatchSnapshot());

  it('should render correctly when the type is not specified and the button is disabled', (): void => expectButtonToMatchSnapshot(undefined, true));
});
