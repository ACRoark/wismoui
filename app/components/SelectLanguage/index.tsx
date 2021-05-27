import React, { ChangeEvent } from 'react';

import useLanguage from 'hooks/useLanguage';

const SelectLanguage: React.FC = (): React.ReactElement => {
  const { changeLanguage, language, supportedLanguages } = useLanguage();

  const renderOptions = (): React.ReactElement[] =>
    Object.keys(supportedLanguages).map(
      (key: string): React.ReactElement => (
        <option key={key} value={key}>
          {supportedLanguages[key]}
        </option>
      ),
    );

  const selectionChanged = (event: ChangeEvent<HTMLSelectElement>): void => changeLanguage(event.target.value);

  return (
    <select onChange={selectionChanged} value={language}>
      {renderOptions()}
    </select>
  );
};

export default SelectLanguage;
