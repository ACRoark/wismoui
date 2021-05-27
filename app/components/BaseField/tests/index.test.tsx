import React from 'react';
import { MessageDescriptor } from 'react-intl';

import { SUPPORTED_LOCALES } from 'locales';

import { createSnapshotWithIntl, renderWithIntl } from 'testing/utils';

import BaseField from '..';

const label: MessageDescriptor = {
  id: 'wismo.components.base-field.tests.label',
  defaultMessage: 'This is just a filler message',
};

const fillerComponent = <div>1234567890</div>;

describe('<BaseField />', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  languages.forEach((language: string): void => {
    it(`should not log errors in console when rendered in ${language}`, (): void => {
      const spy = jest.spyOn(global.console, 'error');

      renderWithIntl(<BaseField label={label}>{fillerComponent}</BaseField>, language);

      expect(spy).not.toHaveBeenCalled();
    });

    it(`should render correctly when the current language is ${language}`, (): void => {
      const tree = createSnapshotWithIntl(<BaseField label={label}>{fillerComponent}</BaseField>, language);

      expect(tree).toMatchSnapshot();
    });
  });
});
