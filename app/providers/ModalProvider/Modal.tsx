import classnames from 'classnames';
import React from 'react';
import { Modal as InternalModal } from 'react-responsive-modal';

import ActiveCloseIcon from 'images/ActiveCloseIcon';
import IModalConfig from 'types/IModalConfig';

import './Modal.less';

interface IModalProps {
  config: IModalConfig;
  onClose?: () => void;
}

const CloseIcon = <ActiveCloseIcon title="close" />;

const Modal: React.FC<IModalProps> = (props: IModalProps): React.ReactElement => {
  const { config, onClose } = props;
  const { className, content, footer, title } = config;

  const handleClose = (): void => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <InternalModal
      classNames={{
        closeButton: 'dte-wismo-modal-close-button',
        modal: classnames(className, 'dte-wismo-modal'),
        overlay: 'dte-wismo-modal-overlay',
      }}
      closeIcon={CloseIcon}
      onClose={handleClose}
      open={!!content}
    >
      <div className="dte-wismo-modal-title">{title}</div>
      <div className="dte-wismo-modal-body">
        <div className="dte-wismo-modal-content">{content}</div>
        {footer && <div className="dte-wismo-modal-footer">{footer}</div>}
      </div>
    </InternalModal>
  );
};

export default Modal;
