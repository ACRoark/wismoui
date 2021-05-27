import React, { ReactElement } from 'react';
import { FormattedMessage } from 'react-intl';

import { SlotType } from 'types';

import messages from './messages';

const getTime = (slotType: SlotType | string): string | ReactElement => {
  return slotType ? <FormattedMessage {...messages[`${slotType}_appointment`]} /> : '';
};

export default getTime;
