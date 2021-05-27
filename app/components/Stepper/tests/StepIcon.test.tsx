import React from 'react';

import { createSnapshot } from 'testing/utils';

import StepIcon from '../StepIcon';
import { StepperStatus } from '../types';

const expectComponentToMatchSnapshot = (status: StepperStatus): void => {
  const tree = createSnapshot(<StepIcon status={status} />);

  expect(tree).toMatchSnapshot();
};

describe('StepIcon', (): void => {
  it('should display active icon when given active status', (): void => expectComponentToMatchSnapshot(StepperStatus.Active));

  it('should display completed icon when given completed status', (): void => expectComponentToMatchSnapshot(StepperStatus.Completed));

  it('should display error icon when given error status', (): void => expectComponentToMatchSnapshot(StepperStatus.Error));

  it('should display pending icon when given pending status', (): void => expectComponentToMatchSnapshot(StepperStatus.Pending));
});
