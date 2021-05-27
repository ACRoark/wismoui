import React from 'react';

import { SUPPORTED_LOCALES } from 'locales';

import { createSnapshotWithIntl, renderWithIntl } from 'testing/utils';
import { SlotType, SlotTypes } from 'types';

import Appointment from '../Appointment';

const expectComponentToMatchSnapshot = (language: string, product: string, slotType: SlotType): void => {
  const tree = createSnapshotWithIntl(<Appointment product={product} slotType={slotType}/>, language);

  expect(tree).toMatchSnapshot();
};

const expectNoConsoleErrors = (language: string, product: string, slotType: SlotType): void => {
  const spy = jest.spyOn(global.console, 'error');

  renderWithIntl(<Appointment product={product} slotType={slotType}/>, language);

  expect(spy).not.toHaveBeenCalled();
};

describe('Appointment component', (): void => {
  const languages = Object.keys(SUPPORTED_LOCALES);

  SlotTypes.forEach((slotType: SlotType): void => {
    languages.forEach((language: string): void => {
      it(`should not log errors in console when rendered for a residential electric product,
      the appointment time is ${slotType} and the current language is ${language}`, (): void =>
        expectNoConsoleErrors(language, 'EFR_D1', slotType));

      it(`should not log errors in console when rendered for a residential gas product,
      the appointment time is ${slotType} and the current language is ${language}`, (): void =>
        expectNoConsoleErrors(language, 'GCR_A_H', slotType));

      it(`should render properly when given a residential electric product,
      the appointment time is ${slotType} and the current language is ${language}`, (): void =>
        expectComponentToMatchSnapshot(language, 'EFR_D1', slotType));

      it(`should render properly when given a residential gas product,
      the appointment time is ${slotType} and the current language is ${language}`, (): void =>
        expectComponentToMatchSnapshot(language, 'GCR_A_H', slotType));

      it(`should render the default Service appointment when given a product that is neither gas or electric,
      the appointment time is ${slotType} and the current language is ${language}`, (): void =>
        expectComponentToMatchSnapshot(language, 'INTERNET', slotType));
    });
  });
});
