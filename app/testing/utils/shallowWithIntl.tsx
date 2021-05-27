import { shallow } from 'enzyme';
import React from 'react';
import { RawIntlProvider } from 'react-intl';

import { DEFAULT_LOCALE } from 'locales';

import createIntlShape from './createIntlShape';

// tslint:disable-next-line: typedef
const shallowWithIntl = (children: React.ReactNode, locale: string = DEFAULT_LOCALE) => {
  const intl = createIntlShape(locale);

  return shallow(<RawIntlProvider value={intl}>{children}</RawIntlProvider>);
};

export default shallowWithIntl;
