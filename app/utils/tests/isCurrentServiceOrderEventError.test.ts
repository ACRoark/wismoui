import IServiceOrderEvent from 'types/IServiceOrderEvent';
import isCurrentServiceOrderEventError from 'utils/isCurrentServiceOrderEventError';

const errorStatuses = ['CALL_DTE', 'DELAYED', 'RESCHEDULED', 'PARTIAL_COMPLETION'];

const serviceOrderEvents1: IServiceOrderEvent[] = [
  {
    appointment: {
      date: '20200709',
      slotType: 'AN',
    },
    latestStatus: {
      createdAtDate: '20200707',
      createdAtTime: '135503',
      serviceOrderEventStatus: 'CALL_DTE',
    },
    product: 'EFR_D1',
    serviceOrderCategory: 'SDI1',
    serviceOrderId: '800006677501',
  },
  {
    appointment: {
      date: '20200709',
      slotType: 'AN',
    },
    latestStatus: {
      createdAtDate: '20200707',
      createdAtTime: '135505',
      serviceOrderEventStatus: 'ON_SCHEDULE',
    },
    product: 'EFR_D1_1',
    serviceOrderCategory: 'SDI1',
    serviceOrderId: '800006677502',
  },
];

const serviceOrderEvents2: IServiceOrderEvent[] = [
  {
    appointment: {
      date: '20200710',
      slotType: 'AN',
    },
    latestStatus: {
      createdAtDate: '20200708',
      createdAtTime: '135503',
      serviceOrderEventStatus: 'CALL_DTE',
    },
    product: 'EFR_D1',
    serviceOrderCategory: 'SDI1',
    serviceOrderId: '800006677501',
  },
  {
    appointment: {
      date: '20200709',
      slotType: 'AN',
    },
    latestStatus: {
      createdAtDate: '20200707',
      createdAtTime: '135505',
      serviceOrderEventStatus: 'ON_SCHEDULE',
    },
    product: 'EFR_D1_1',
    serviceOrderCategory: 'SDI1',
    serviceOrderId: '800006677502',
  },
];

describe('isCurrentServiceOrderEventError', (): void => {
  it(`should return false when the the last serviceOrderEvent\'s status is not in [${errorStatuses}]`, (): void => {

    expect(isCurrentServiceOrderEventError(serviceOrderEvents1)).toBe(false);
  });
  it(`should return true when the the last serviceOrderEvent\'s status is in [${errorStatuses}]`, (): void => {

    expect(isCurrentServiceOrderEventError(serviceOrderEvents2)).toBe(true);
  });
});
