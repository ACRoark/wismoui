import { ReactElement } from 'react';
import { Description } from 'types';

export interface IStepDescription {
  description: Description;
  key: string;
  status: StepperStatus;
  title: ReactElement | string;
}

export enum StepperStatus {
  Active = 'active',
  Completed = 'completed',
  Error = 'error',
  Pending = 'pending',
}
