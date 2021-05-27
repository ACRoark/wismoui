import moment from 'moment';
import React from 'react';

import { userIsAuthenticated } from 'security/utils';

import './index.less';

import EditLink from './EditLink';

interface IEditPhoneNumberLinkProps {
  serviceDate: string;
}

const EditPhoneNumberLink: React.FC<IEditPhoneNumberLinkProps> = (
  props: IEditPhoneNumberLinkProps,
): React.ReactElement => {
  const { serviceDate } = props;

  const today = moment();
  const scheduledDate = moment(serviceDate);

  const showLink = userIsAuthenticated() && scheduledDate.isAfter(today);

  return <>{showLink && <EditLink />}</>;
};

export default EditPhoneNumberLink;
