import { mount } from 'enzyme';
import React from 'react';
import { RawIntlProvider } from 'react-intl';

import { DEFAULT_LOCALE } from 'locales';

import createIntlShape from './createIntlShape';

// tslint:disable-next-line: typedef
const mountWithIntl = (children: React.ReactNode, locale: string = DEFAULT_LOCALE) => {
  const intl = createIntlShape(locale);

  return mount(<RawIntlProvider value={intl}>{children}</RawIntlProvider>);
};

export default mountWithIntl;
