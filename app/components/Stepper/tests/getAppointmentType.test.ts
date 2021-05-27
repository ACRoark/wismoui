import { ProductType } from 'types';

import getAppointmentType from '../getAppointmentType';

describe('getAppointmentType', (): void => {
  it('should return electricAppointment when the first letter of the product is E', (): void => {
    const product: ProductType = 'ECCND3_2';

    expect(getAppointmentType(product)).toBe('electricAppointment');
  });

  it('should return gasAppointment when the first letter of the product is G', (): void => {
    const product: ProductType = 'GCC_GS_1H';

    expect(getAppointmentType(product)).toBe('gasAppointment');
  });

  it('should return serviceAppointment when the first letter of the product is NOT E or G', (): void => {
    const product = 'whatever';

    expect(getAppointmentType(product)).toBe('serviceAppointment');
  });
});
