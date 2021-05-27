import { mount } from 'enzyme';
import React from 'react';
import { useDispatch } from 'react-redux';

import { testConfig } from 'components/constants';
import EditServiceDateLink from 'components/EditServiceDateLink';
import useConfig from 'hooks/useConfig';
import useModal from 'hooks/useModal';
import { LanguageProvider } from 'providers/LanguageProvider';
import { userIsAuthenticated } from 'security/utils';
import AppointmentDate1599 from '../AppointmentDate1599';

jest.mock('hooks/useConfig');
jest.mock('hooks/useModal');
jest.mock('security/utils');
jest.mock('react-redux');

const mockAuth = userIsAuthenticated as jest.MockedFunction<typeof userIsAuthenticated>;
const mockConfig = useConfig as jest.MockedFunction<typeof useConfig>;
const mockDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;
const mockModal = useModal as jest.MockedFunction<typeof useModal>;

describe('AppointmentDate', (): void => {
  const isAuthenticated = true;
  mockAuth.mockReturnValue(isAuthenticated);
  mockConfig.mockReturnValue({ ...testConfig });
  mockDispatch.mockReturnValue(jest.fn());
  mockModal.mockReturnValue({
    hideModal: jest.fn(),
    showModal: jest.fn(),
  });

  it('should show the edit link by default', (): void => {
    const wrapper = mount(<LanguageProvider locale="en"><AppointmentDate1599 date="20201201" /></LanguageProvider>);

    expect(wrapper.contains(<EditServiceDateLink wantDate="20201201" />)).toEqual(true);
  });

  it('should hide the edit link when given multiple service dates and user is authenticated', (): void => {
    const wrapper = mount(<LanguageProvider locale="en"><AppointmentDate1599 date="20201201" showEditLink={false} /></LanguageProvider>);

    expect(wrapper.contains(<EditServiceDateLink wantDate="20201201" />)).toEqual(false);
  });

  it('should show the edit link when given only one service date and user is authenticated', (): void => {
    const wrapper = mount(<LanguageProvider locale="en"><AppointmentDate1599 date="20201201" showEditLink /></LanguageProvider>);

    expect(wrapper.contains(<EditServiceDateLink wantDate="20201201" />)).toEqual(true);
  });
});
