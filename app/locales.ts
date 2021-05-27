export const DEFAULT_LOCALE = 'en';

const PROD_LOCALES = {
  en: 'English',
};

const TEST_LOCALES = {
  en: 'English',
  es: 'Spanish',
};

export const SUPPORTED_LOCALES = process.env.NODE_ENV === 'production' ? PROD_LOCALES : TEST_LOCALES;
