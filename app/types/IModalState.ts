import IModalConfig from './IModalConfig';

interface IModalState {
  hideModal: () => void;
  showModal: (config: IModalConfig) => void;
}

export default IModalState;
