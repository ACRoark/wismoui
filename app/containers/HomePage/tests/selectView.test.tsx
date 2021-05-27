import React from 'react';
import { Redirect } from 'react-router-dom';

import selectView from '../selectView';

describe('selectView', (): void => {
  it('should not log errors in console when called with false', (): void => {
    const spy = jest.spyOn(global.console, 'error');

    selectView('', false);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should not log errors in console when called with true', (): void => {
    const spy = jest.spyOn(global.console, 'error');

    selectView('', true);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should redirect to the summary page when the user is authenticated', (): void => {
    const view = selectView('', true);

    expect(view).toStrictEqual(<Redirect to="/orders" />);
  });

  it('should redirect to the guest login page when the user is not authenticated', (): void => {
    const view = selectView('', false);

    expect(view).toStrictEqual(<Redirect to="/search" />);
  });
});
