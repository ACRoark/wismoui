/**
 * Language Generator
 */
const fs = require('fs');
const { exec } = require('child_process');

function languageIsSupported(language) {
  try {
    fs.accessSync(`app/translations/${language}.json`, fs.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = {
  description: 'Add a language',
  prompts: [
    {
      type: 'input',
      name: 'language',
      message: 'What is the language you want to add i18n support for (e.g. "fr", "de")?',
      default: 'fr',
      validate: (value) => {
        if (/.+/.test(value) && value.length === 2) {
          return languageIsSupported(value) ? `The language "${value}" is already supported.` : true;
        }

        return '2 character language specifier is required';
      },
    },
    {
      type: 'input',
      name: 'languageName',
      message: 'What is the display name of the language you want to add i18n support for (e.g. "French", "German")?',
      default: 'French',
    },
  ],

  actions: () => {
    const actions = [];

    actions.push({
      type: 'modify',
      path: '../../app/locales.ts',
      pattern: /((\s+[a-z]{2}:\s'[a-zA-Z]+',\r\n)+)/g,
      templateFile: './language/app-locale.hbs',
    });

    actions.push({
      type: 'modify',
      path: '../../app/i18n.ts',
      pattern: /(const ..TranslationMessages = require\('translations\/..\.json'\);\r\n)(?!const ..TranslationMessages = require\('translations\/..\.json'\);\r\n)/g,
      templateFile: './language/intl-locale-data.hbs',
    });

    actions.push({
      type: 'modify',
      path: '../../app/i18n.ts',
      pattern: /(\s+[a-z]{2}: formatTranslationMessages\('[a-z]{2}', [a-z]{2}TranslationMessages\),\r\n)(?!\s+[a-z]{2}: formatTranslationMessages\('[a-z]{2}', [a-z]{2}TranslationMessages\),\r\n)/g,
      templateFile: './language/format-translation-messages.hbs',
    });

    actions.push({
      type: 'add',
      path: '../../app/translations/{{language}}.json',
      templateFile: './language/translations-json.hbs',
      abortOnFail: true,
    });

    actions.push(() => {
      const cmd = 'npm run extract-messages';

      exec(cmd, (err, result) => {
        if (err) {
          throw err;
        }

        process.stdout.write(result);
      });

      return 'modify translation messages';
    });

    return actions;
  },
};
