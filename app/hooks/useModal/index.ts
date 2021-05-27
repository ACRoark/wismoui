import { useContext } from 'react';

import { ModalContext } from 'providers/ModalProvider';
import IModalState from 'types/IModalState';

const useModal = (): IModalState => {
  const context = useContext(ModalContext);

  if (context) {
    return context;
  }

  throw new Error('useModal can only be used inside ModalProvider');
};

export default useModal;
