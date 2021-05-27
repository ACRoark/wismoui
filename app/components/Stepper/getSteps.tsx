import IOrderRequest from 'types/IOrderRequest';

import { IStepDescription } from './types';

import getCompletedStep from './getCompletedStep';
import getRequestedStep from './getRequestedStep';
import getScheduledStep from './getScheduledStep';
import getVerificationStep from './getVerificationStep';
import getVerificationStep2 from './getVerificationStep2';

interface IGetStepsOptions {
  bug3665?: boolean;
  bug3883?: boolean;
  us1599?: boolean;
  us1946?: boolean;
  us3273?: boolean;
}

const getSteps = (
  orderCreatedDate: string,
  serviceRequest: IOrderRequest,
  options: IGetStepsOptions,
): IStepDescription[] => {
  const { bug3665, bug3883, us1599, us1946, us3273 } = options;

  const getScheduledStepOptions = { bug3883, us1599, us1946, us3273 };
  const getVerificationStepOptions = { bug3665, bug3883 };

  if (us1946) {
    if (bug3665) {
      return [
        getRequestedStep(orderCreatedDate, serviceRequest),
        getVerificationStep2(orderCreatedDate, serviceRequest, getVerificationStepOptions),
        getScheduledStep(orderCreatedDate, serviceRequest, getScheduledStepOptions),
        getCompletedStep(orderCreatedDate, serviceRequest),
      ];
    }
    return [
      getRequestedStep(orderCreatedDate, serviceRequest),
      getVerificationStep2(orderCreatedDate, serviceRequest),
      getScheduledStep(orderCreatedDate, serviceRequest, getScheduledStepOptions),
      getCompletedStep(orderCreatedDate, serviceRequest),
    ];
  }

  return [
    getRequestedStep(orderCreatedDate, serviceRequest),
    getVerificationStep(orderCreatedDate, serviceRequest),
    getScheduledStep(orderCreatedDate, serviceRequest, getScheduledStepOptions),
    getCompletedStep(orderCreatedDate, serviceRequest),
  ];
};

export default getSteps;
