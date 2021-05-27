import faker from 'faker';

import { IAddress } from 'types';

const generateAddress = (): IAddress => ({
  city: faker.address.city(),
  line1: faker.address.streetAddress(),
  line2: faker.address.secondaryAddress(),
  state: faker.address.state(),
  zip: faker.address.zipCode(),
});

export default generateAddress;
