import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';
import useConfig from 'hooks/useConfig';
import useModal from 'hooks/useModal';
import useThunkDispatch from 'hooks/useThunkDispatch';
import { trackButtonClick } from 'store/actions';

import './index.less';

import buildModal from './buildModal';
import messages from './messages';

const EditLink: React.FC = (): React.ReactElement => {
  const dispatch = useThunkDispatch();
  const { urls } = useConfig();
  const { hideModal, showModal } = useModal();

  const modal = buildModal(hideModal, (): void => {
    window.location.href = urls.editPhoneNumber;
  });

  const trackButtonAndOpenModal = (): void => {
    dispatch(trackButtonClick('edit phone link'));
    showModal(modal);
  };

  return (
    <div className="dte-wismo-edit-phone-number-link">
      <Button onClick={trackButtonAndOpenModal} type="link">
        <FormattedMessage {...messages.linkText} />
      </Button>
    </div>
  );
};

export default EditLink;
