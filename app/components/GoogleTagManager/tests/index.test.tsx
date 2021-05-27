/**
 *
 * Tests for GoogleTagManager
 *
 */
import { render } from 'enzyme';
import React from 'react';

import { testConfig } from 'components/constants';
import useConfig from 'hooks/useConfig';
import { IApplicationConfig } from 'types';

import GoogleTagManager from '..';

jest.mock('hooks/useConfig');

const config: IApplicationConfig = {
  ...testConfig,
  googleTagManagerConfig: {
    auth: 'abc',
    id: 'def',
    preview: 'ghi',
  },
};

const mockConfig = useConfig as jest.MockedFunction<typeof useConfig>;

describe('<GoogleTagManager />', (): void => {
  it('should not log errors in console when rendered', (): void => {
    const spy = jest.spyOn(global.console, 'error');

    mockConfig.mockReturnValue(config);

    render(<GoogleTagManager><div>a child</div></GoogleTagManager>);

    expect(spy).not.toHaveBeenCalled();
  });
});
