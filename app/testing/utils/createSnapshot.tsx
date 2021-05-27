import React from 'react';
import renderer from 'react-test-renderer';

import { DEFAULT_LOCALE } from 'locales';

import { LanguageProvider } from 'providers/LanguageProvider';
import TestRendererJsonType from 'testing/types/TestRendererJsonType';

export const createSnapshot = (children: React.ReactNode): TestRendererJsonType => {
  const tree: TestRendererJsonType = renderer.create(<>{children}</>).toJSON();

  return tree;
};

export const createSnapshotWithIntl = (
  children: React.ReactNode,
  locale: string = DEFAULT_LOCALE,
): TestRendererJsonType => {
  const tree: TestRendererJsonType = renderer
    .create(<LanguageProvider locale={locale}>{children}</LanguageProvider>)
    .toJSON();

  return tree;
};
