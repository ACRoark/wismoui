import React from 'react';
import { Provider } from 'react-redux';

import { SUPPORTED_LOCALES } from 'locales';

import { createMockStore, createSnapshotWithIntl } from 'testing/utils';
import { ProductType } from 'types';

import AppointmentCallDte from '../AppointmentCallDte';

const expectComponentToMatchSnapshot = (product: ProductType): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);
  languages.forEach((language: string): void => {
    const tree = createSnapshotWithIntl(<Provider store={createMockStore()}><AppointmentCallDte product={product} /></Provider>, language);

    expect(tree).toMatchSnapshot();
  });
};

describe('<AppointmentCallDte />', (): void => {

  it('should render correctly when a product is given', (): void =>
    expectComponentToMatchSnapshot('EFR_D1'));
});
