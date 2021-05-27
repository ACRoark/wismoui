import moment from 'moment';
import React from 'react';

import { userIsAuthenticated } from 'security/utils';

import './index.less';

import EditLink from './EditLink';

interface IEditServiceDateLinkProps {
  wantDate: string;
}

const EditServiceDateLink: React.FC<IEditServiceDateLinkProps> = (
  props: IEditServiceDateLinkProps,
): React.ReactElement => {
  const { wantDate } = props;

  const today = moment();
  const scheduledDate = moment(wantDate);

  const showLink = userIsAuthenticated() && scheduledDate.isAfter(today);

  return <>{showLink && <EditLink />}</>;
};

export default EditServiceDateLink;
