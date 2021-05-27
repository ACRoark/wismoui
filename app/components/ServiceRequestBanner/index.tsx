import React from 'react';

import { IOrderRequest } from 'types';

import DefaultBanner from './DefaultBanner';
import ErrorBanner from './ErrorBanner';
import getBannerNotification from './getBannerNotification';
import { IBannerNotification } from './types';

interface IServiceRequestBannerProps {
  serviceRequest: IOrderRequest;
}

const ServiceRequestBanner: React.FC<IServiceRequestBannerProps> = (
  props: IServiceRequestBannerProps,
): React.ReactElement => {
  const { serviceRequest } = props;

  const bannerNotification: IBannerNotification = getBannerNotification(serviceRequest);

  if (bannerNotification.hasError) {
    return <ErrorBanner message={bannerNotification.message} />;
  }

  return <DefaultBanner message={bannerNotification.message} />;
};

export default ServiceRequestBanner;
