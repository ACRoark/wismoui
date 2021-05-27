import classnames from 'classnames';

import { IOrderRequestInfo } from 'types';

import getCurrentOfficeStatusCode from './getCurrentOfficeStatusCode';

interface ITitleData {
  classNames: string;
  errorMessage: string;
  hasBPEM: boolean;
  prefix: string;
}

const getTitleData = (props: IOrderRequestInfo): ITitleData => {
  const { currentOrderRequestStatus, verificationEvents } = props;

  const officeStatusCode =
    currentOrderRequestStatus?.orderRequestStatus === 'NEEDS_VERIFICATION'
      ? getCurrentOfficeStatusCode(verificationEvents)
      : null;

  const hasBPEM = !!officeStatusCode;

  return {
    classNames: classnames('title', { error: hasBPEM }),
    errorMessage: hasBPEM ? `${officeStatusCode}_description` : '',
    hasBPEM,
    prefix: hasBPEM ? '! ' : '',
  };
};

export default getTitleData;
