import moment from 'moment';

import generate from 'testing/generators';
import { IOrderSearchResult } from 'types';

import shouldIncludeResult from '../shouldIncludeResult';

describe('showIncludeResult(...)', (): void => {
  const bug2263 = true;

  it('should return false when the order was adandoned', (): void => {
    const searchResult: IOrderSearchResult = {
      ...generate.orderSearchResult(),
      closedDetails: {
        closedAt: generate.pastDate(),
        reason: 'ABANDONED',
      },
    };

    const actual = shouldIncludeResult(searchResult);

    expect(actual).toBe(false);
  });

  it('should return false when the order was canceled more than 30 days ago', (): void => {
    const today = moment();

    const closedAt = today.subtract(31, 'days').format('YYYY-MM-DDTHH:mm:ss.SSSSSSSZ');

    const searchResult: IOrderSearchResult = {
      ...generate.orderSearchResult(),
      closedDetails: {
        closedAt,
        reason: 'CANCELED',
      },
    };

    const actual = shouldIncludeResult(searchResult);

    expect(actual).toBe(false);
  });

  it('should return false when the order was closed due to BPEM more than 30 days ago', (): void => {
    const today = moment();

    const closedAt = today.subtract(31, 'days').format('YYYY-MM-DDTHH:mm:ss.SSSSSSSZ');

    const searchResult: IOrderSearchResult = {
      ...generate.orderSearchResult(),
      closedDetails: {
        closedAt,
        reason: 'BPEM_CLOSED',
      },
    };

    const actual = shouldIncludeResult(searchResult, bug2263);

    expect(actual).toBe(false);
  });

  it('should return false when the order was fulfilled', (): void => {
    const searchResult: IOrderSearchResult = {
      ...generate.orderSearchResult(),
      closedDetails: {
        closedAt: generate.pastDate(),
        reason: 'FULFILLED',
      },
    };

    const actual = shouldIncludeResult(searchResult);

    expect(actual).toBe(false);
  });

  it('should return true when the order was canceled less than 30 days ago', (): void => {
    const closedDays = generate.randomNumber(1, 29);
    const today = moment();

    const closedAt = today.subtract(closedDays, 'days').format('YYYY-MM-DDTHH:mm:ss.SSSSSSSZ');

    const searchResult: IOrderSearchResult = {
      ...generate.orderSearchResult(),
      closedDetails: {
        closedAt,
        reason: 'CANCELED',
      },
    };

    const actual = shouldIncludeResult(searchResult);

    expect(actual).toBe(true);
  });

  it('should return true when the order was closed due to BPEM less than 30 days ago', (): void => {
    const closedDays = generate.randomNumber(1, 29);
    const today = moment();

    const closedAt = today.subtract(closedDays, 'days').format('YYYY-MM-DDTHH:mm:ss.SSSSSSSZ');

    const searchResult: IOrderSearchResult = {
      ...generate.orderSearchResult(),
      closedDetails: {
        closedAt,
        reason: 'BPEM_CLOSED',
      },
    };

    const actual = shouldIncludeResult(searchResult, bug2263);

    expect(actual).toBe(true);
  });

  it('should return true when the order is not closed', (): void => {
    const searchResult: IOrderSearchResult = {
      ...generate.orderSearchResult(),
      closedDetails: null,
    };

    const actual = shouldIncludeResult(searchResult);

    expect(actual).toBe(true);
  });
});
