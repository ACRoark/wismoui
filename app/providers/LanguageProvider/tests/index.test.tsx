/**
 *
 * Tests for LanguageProvider
 *
 */
import { render } from 'enzyme';
import React from 'react';

import { LanguageProvider } from '..';

const ChildComponent = (): React.ReactElement => (<div/>);

describe('<LanguageProvider />', (): void => {
  it('should not log errors in console when rendered', (): void => {
    const spy = jest.spyOn(global.console, 'error');

    render(<LanguageProvider><ChildComponent /></LanguageProvider>);

    expect(spy).not.toHaveBeenCalled();
  });
});
