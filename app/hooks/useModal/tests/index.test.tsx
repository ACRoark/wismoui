import { render, shallow, ShallowWrapper } from 'enzyme';
import React from 'react';

import { ModalProvider } from 'providers/ModalProvider';

import useModal from '..';

const ModalContent = <div>Hello, WISMO!</div>;

const TestComponent: React.FC = (): React.ReactElement => {
  const { showModal } = useModal();

  showModal({ content: ModalContent});

  return (<></>);
};

const Wrapper: React.FC = (): React.ReactElement => (<ModalProvider><TestComponent /></ModalProvider>);

describe('useModal hook', (): void => {
  it('should not log errors in console when rendered within a <ModalProvider>', (): void => {
    const spy = jest.spyOn(global.console, 'error');

    render(<Wrapper />);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should throw an error when used outside <ModalProvider>', (): void => {
    // tslint:disable-next-line: no-any
    expect((): ShallowWrapper<any> => shallow(<TestComponent />)).toThrowError();
  });
});
