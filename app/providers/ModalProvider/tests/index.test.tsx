/**
 *
 * Tests for ModalProvider
 *
 */
import { render } from 'enzyme';
import React from 'react';

import { ModalProvider } from '..';

const ChildComponent = (): React.ReactElement => (<div/>);

describe('<ModalProvider />', (): void => {
  it('should not log errors in console when rendered', (): void => {
    const spy = jest.spyOn(global.console, 'error');

    render(<ModalProvider><ChildComponent /></ModalProvider>);

    expect(spy).not.toHaveBeenCalled();
  });
});
