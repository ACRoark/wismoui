import { useContext } from 'react';

import { LanguageContext } from 'providers/LanguageProvider';
import ILanguageState from 'types/ILanguageState';

const useLanguage = (): ILanguageState => {
  const context = useContext(LanguageContext);

  if (context) {
    return context;
  }

  throw new Error('useLanguage can only be used inside LanguageProvider');
};

export default useLanguage;
