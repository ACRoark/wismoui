/**
 *
 * ModalProvider
 *
 */
import React, { useState } from 'react';

import IModalConfig from 'types/IModalConfig';
import IModalState from 'types/IModalState';

import Modal from './Modal';

import 'react-responsive-modal/styles.css';

interface IModalProviderProps {
  children?: React.ReactNode;
}

const ModalContext = React.createContext<IModalState | null>(null);

const ModalConsumer = ModalContext.Consumer;

const ModalProvider: React.FC<IModalProviderProps> = (props: IModalProviderProps): React.ReactElement => {
  const { children } = props;

  const [modalConfig, setModalConfig] = useState<IModalConfig | null>(null);

  const showModal = (config: IModalConfig): void => {
    setModalConfig(config);
  };

  const hideModal = (): void => {
    setModalConfig(null);
  };

  return (
    <ModalContext.Provider
      value={{
        hideModal,
        showModal,
      }}
    >
      {React.Children.only(children)}
      {modalConfig && <Modal onClose={hideModal} config={modalConfig} />}
    </ModalContext.Provider>
  );
};

export { ModalConsumer, ModalContext, ModalProvider };
