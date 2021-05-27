import { SUPPORTED_LOCALES } from 'locales';

type SupportedLocalesType = typeof SUPPORTED_LOCALES;

interface ILanguageState {
  changeLanguage: (language: string) => void;
  language: string;
  supportedLanguages: SupportedLocalesType;
}

export default ILanguageState;
