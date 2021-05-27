import ICustomer from 'types/ICustomer';

import generate from './generate';

const generateCustomer = (): ICustomer => ({
  bpId: generate.bpId(),
  name: generate.lastName(),
});

export default generateCustomer;
