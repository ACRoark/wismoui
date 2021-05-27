import { ServiceOrderEventStatus, ServiceOrderEventStatuses } from 'types';

import generateRandomNumber from './generateRandomNumber';

const generateServiceOrderEventStatus = (): ServiceOrderEventStatus =>
  ServiceOrderEventStatuses[generateRandomNumber(0, ServiceOrderEventStatuses.length - 1)] as ServiceOrderEventStatus;

export default generateServiceOrderEventStatus;
