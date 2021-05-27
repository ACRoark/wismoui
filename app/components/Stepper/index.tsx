import React, { FC, ReactElement } from 'react';

import useFlags from 'hooks/useFlags';
import IOrderRequest from 'types/IOrderRequest';
import getSteps from './getSteps';
import Step from './Step';
import { IStepDescription } from './types';

import './index.less';

interface IStepperProps {
  orderCreatedDate: string;
  serviceRequest: IOrderRequest;
}

const Stepper: FC<IStepperProps> = (props: IStepperProps): ReactElement => {
  const { bug3665, bug3883, us1599, us1946, us3273 } = useFlags();
  const { orderCreatedDate, serviceRequest } = props;

  const options = {
    bug3665,
    bug3883,
    us1599,
    us1946,
    us3273,
  };

  return (
    <div className="dte-wismo-stepper">
      {getSteps(orderCreatedDate, serviceRequest, options).map(
        (step: IStepDescription): ReactElement => (
          <Step key={step.key} {...step} />
        ),
      )}
    </div>
  );
};

export default Stepper;
