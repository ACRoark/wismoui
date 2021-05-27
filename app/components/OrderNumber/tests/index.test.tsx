import { render, shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import { createSnapshot } from 'testing/utils';

import OrderNumber from '..';

describe('<OrderNumber />', (): void => {
  it('should not log errors in console when rendered', (): void => {
    const spy = jest.spyOn(global.console, 'error');

    render(<OrderNumber value="MI12345678" />);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should render correctly when given a valid value', (): void => {
    const tree = createSnapshot(<OrderNumber value="MI12345678" />);

    expect(tree).toMatchSnapshot();
  });

  it('should throw an error when order number has non-numeric characters', (): void => {
    // tslint:disable-next-line: no-any
    expect((): ShallowWrapper<any> =>  shallow(<OrderNumber value="ABCDEFGHIJKL" />)).toThrowError();
  });

  it('should throw an error when order number is less than 10 characters', (): void => {
    // tslint:disable-next-line: no-any
    expect((): ShallowWrapper<any> => shallow(<OrderNumber value="MO123456"/>)).toThrowError();
  });

  it('should throw an error when order number is more than 10 characters', (): void => {
    // tslint:disable-next-line: no-any
    expect((): ShallowWrapper<any> => shallow(<OrderNumber value="MT1234561234567"/>)).toThrowError();
  });
});
