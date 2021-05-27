import { createIntl, createIntlCache, IntlShape } from 'react-intl';

import { translationMessages } from 'i18n';

// This is optional but highly recommended
// since it prevents memory leak
const cache = createIntlCache();

const createIntlShape = (locale: string): IntlShape =>
  createIntl(
    {
      locale,
      messages: translationMessages[locale],
    },
    cache,
  );

export default createIntlShape;
