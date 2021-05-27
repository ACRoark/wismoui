import React, { FC, ReactElement } from 'react';

import CompletedIcon from 'components/Icons/CompletedIcon';
import ErrorIcon from 'components/Icons/ErrorIcon';

import { StepperStatus } from './types';

interface IStepIcon {
  status: StepperStatus;
}

const StepIcon: FC<IStepIcon> = ({ status }: IStepIcon): ReactElement => {
  switch (status) {
    case StepperStatus.Active:
      return <i className="icon active" />;
    case StepperStatus.Completed:
      return <CompletedIcon />;
    case StepperStatus.Error:
      return <ErrorIcon />;
    case StepperStatus.Pending:
    default:
      return <i className="icon pending" />;
  }
};

export default StepIcon;
