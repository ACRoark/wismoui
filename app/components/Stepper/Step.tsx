import React, { FC, ReactElement } from 'react';
import { Description } from 'types';

import StepIcon from './StepIcon';
import { StepperStatus } from './types';

interface IStepProps {
  description: Description;
  status: StepperStatus;
  title: string | ReactElement;
}

const Step: FC<IStepProps> = (props: IStepProps): ReactElement => {
  const { description, status, title } = props;

  return (
    <div className="dte-wismo-step">
      <div className={`container ${status}`}>
        <div className="tail">
          <div className="half-1" />
          <div className="half-2" />
        </div>
        <div className="icon-wrapper">
          <StepIcon status={status} />
        </div>
        <div className="content">
          <div className="title">{title}</div>
          <div className="description">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default Step;
