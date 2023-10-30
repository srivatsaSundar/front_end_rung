import React from 'react';

const LanguageSwitcher = ({ availableLanguages, selectedLanguage, onLanguageChange }) => {
  return (
    <div>
      <select value={selectedLanguage} onChange={onLanguageChange}>
        {availableLanguages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
