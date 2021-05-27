import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { Link, Route } from 'react-router-dom';

import { userIsAuthenticated } from 'security/utils';

import ProtectedRoute from '..';

jest.mock('security/utils');

const mockAuth = userIsAuthenticated as jest.MockedFunction<typeof userIsAuthenticated>;

const HomeComponent: React.FC = (): React.ReactElement => (
  <div>
    <h1>Home</h1>
    <Link to="/path" id="click-me">
      Go
    </Link>
  </div>
);
const OtherComponent: React.FC = (): React.ReactElement => <div>Other Component</div>;
const ProtectedComponent: React.FC = (): React.ReactElement => <div>Protected Component</div>;

// tslint:disable-next-line: typedef
const mountRoutes = (isAuthenticated: boolean, redirectTo?: string) => {
  mockAuth.mockReturnValue(isAuthenticated);

  return mount(
    <MemoryRouter initialEntries={['/path']}>
      <Route exact path="/" component={HomeComponent} />
      <Route exact path="/other" component={OtherComponent} />
      <ProtectedRoute exact path="/path" component={ProtectedComponent} redirectTo={redirectTo} />
    </MemoryRouter>
  );
};

describe('<ProtectedRoute />', (): void => {
  it('should allow access to the requested path when the user is authenticated', (): void => {
    const wrapper = mountRoutes(true);

    expect(wrapper.find(HomeComponent)).toHaveLength(0);
    expect(wrapper.find(OtherComponent)).toHaveLength(0);
    expect(wrapper.find(ProtectedComponent)).toHaveLength(1);
  });

  it('should redirect to the default path when the user is not authenticated and a different redirect path is not provided', (): void => {
    const wrapper = mountRoutes(false);

    expect(wrapper.find(HomeComponent)).toHaveLength(1);
    expect(wrapper.find(OtherComponent)).toHaveLength(0);
    expect(wrapper.find(ProtectedComponent)).toHaveLength(0);
  });

  it('should redirect to the specific path when the user is not authenticated and a different redirect path is provided', (): void => {
    const wrapper = mountRoutes(false, '/other');

    expect(wrapper.find(HomeComponent)).toHaveLength(0);
    expect(wrapper.find(OtherComponent)).toHaveLength(1);
    expect(wrapper.find(ProtectedComponent)).toHaveLength(0);
  });
});
