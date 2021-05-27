import React from 'react';
import { FormattedMessage } from 'react-intl';

import { IOrderRequestInfo } from 'types';
import getTitleData from './getTitleData';

import messages from './messages';

interface INewOrderListItemTitleProps {
  request: IOrderRequestInfo;
}

const NewOrderListItemTitle: React.FC<INewOrderListItemTitleProps> = (
  props: INewOrderListItemTitleProps,
): React.ReactElement => {
  const { request } = props;

  const titleData = getTitleData(request);

  return (
    <div className={titleData.classNames}>
      <FormattedMessage
        {...messages[request.orderRequestType]}
        values={{
          bpem: titleData.hasBPEM ? <FormattedMessage {...messages[titleData.errorMessage]} /> : '',
          date: '',
          prefix: titleData.prefix,
        }}
      />
    </div>
  );
};

export default NewOrderListItemTitle;
