import * as _ from 'lodash';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';
import useModal from 'hooks/useModal';
import useThunkDispatch from 'hooks/useThunkDispatch';
import { trackButtonClick } from 'store/actions';

import IModalConfig from 'types/IModalConfig';

import './index.less';
import messages from './messages';

interface IViewDetailsLinkProps {
  className?: string;
  modal: IModalConfig;
}

const ViewSubstatusDetailsLink: React.FC<IViewDetailsLinkProps> = (
  props: IViewDetailsLinkProps,
): React.ReactElement => {
  const { className, modal } = props;

  const dispatch = useThunkDispatch();
  const { showModal } = useModal();

  const trackButtonAndOpenModal = (): void => {
    dispatch(trackButtonClick('view details link'));
    showModal(modal);
  };

  return (
    <Button className={className} onClick={trackButtonAndOpenModal} type="link">
      <FormattedMessage {...messages.title} />
    </Button>
  );
};

export default ViewSubstatusDetailsLink;
