import moment from 'moment';

import generate from 'testing/generators';
import { ServiceDate } from 'types';

import mapServiceDate from '../mapServiceDate';

describe('mapServiceDate(...)', (): void => {
  it('should return null when there is no appointment scheduled and there are no products', (): void => {
    const request = generate.orderRequest();

    request.products = [];
    request.serviceOrderEvents = [];

    const result = mapServiceDate(request);

    expect(result).toBeNull();
  });

  it('should return the appointment date when there is an appointment scheduled', (): void => {
    const date = '20220701';
    const request = generate.orderRequest();

    request.serviceOrderEvents[0].appointment = {
      date,
      slotType: null,
    };

    const result = mapServiceDate(request);

    const expected: ServiceDate = moment(date, 'YYYYMMDD').toDate();

    expect(result).toEqual(expected);
  });

  it('should return the first product serviceDate when there is no appointment scheduled and the product array is not empty', (): void => {
    const date = '20220701';
    const request = generate.orderRequest();

    request.products[0].serviceDate = date;
    request.serviceOrderEvents = [];

    const result = mapServiceDate(request);

    const expected: ServiceDate = moment(date, 'YYYYMMDD').toDate();

    expect(result).toEqual(expected);
  });
});
