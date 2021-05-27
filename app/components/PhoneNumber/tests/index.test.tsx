import { render, shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import { createSnapshot } from 'testing/utils';

import PhoneNumber from '..';

const expectComponentToMatchSnapshot = (value: string | null): void => {
  const tree = createSnapshot(<PhoneNumber value={value} />);

  expect(tree).toMatchSnapshot();
};

describe('<PhoneNumber />', (): void => {
  it('should not log errors in console when rendered', (): void => {
    const spy = jest.spyOn(global.console, 'error');

    render(<PhoneNumber value="1122334455" />);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should render correctly when phone number has 10 characters', (): void =>
    expectComponentToMatchSnapshot('1122334455'));

  it('should render correctly when phone number has 7 characters', (): void =>
    expectComponentToMatchSnapshot('1122334'));

  it('should render nothing when the value is null', (): void =>
    expectComponentToMatchSnapshot(null));

  it('should throw an error when phone number is not 10 or 7 characters', (): void => {
    // tslint:disable-next-line: no-any
    expect((): ShallowWrapper<any> => shallow(<PhoneNumber value="123456" />)).toThrowError();
  });

  it('should throw an error when phone number is more than 10 characters', (): void => {
    // tslint:disable-next-line: no-any
    expect((): ShallowWrapper<any> => shallow(<PhoneNumber value="12345678910" />)).toThrowError();
  });

  it('should throw an error when phone number is more than 7 but less than 10 characters', (): void => {
    // tslint:disable-next-line: no-any
    expect((): ShallowWrapper<any> => shallow(<PhoneNumber value="12345678" />)).toThrowError();
  });
});
