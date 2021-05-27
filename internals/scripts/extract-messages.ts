import { transform } from '@babel/core';
import fs from 'fs';
import glob from 'glob';
import merge from 'lodash.merge';
import mergeWith from 'lodash.mergewith';
import get from 'lodash/get';
import mkdirp from 'mkdirp';
import path from 'path';
import pify from 'pify';
import readBabelrcUp from 'read-babelrc-up';
import sortKeys from 'sort-keys';

import { SUPPORTED_LOCALES } from '../../app/locales';

// eslint-disable-next-line no-undef
type LocaleMap = Record<string, Record<string, {}>>;

process.stdout.write('Extract Messages\n');
process.stdout.write('===============\n');

const buildDir = 'app/translations';
const locales = Object.keys(SUPPORTED_LOCALES);

const concatArray = (obj: string[], src: string): string[] | undefined => {
  if (Array.isArray(obj)) {
    return obj.concat(src);
  }

  return undefined;
};

// tslint:disable-next-line: typedef
const getBabelrc = (cwd: string) => {
  try {
    const babelrc = readBabelrcUp.sync({ cwd }).babel;

    if (!babelrc.env) {
      return babelrc;
    }

    const env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';

    return mergeWith(babelrc, babelrc.env[env], concatArray);
  } catch (error) {
    process.stderr.write(error);

    return { presets: [], plugins: [] };
  }
};

const localeMap = (arr: string[]): LocaleMap =>
  arr.reduce((obj: Record<string, {}>, x: string): Record<string, {}> => {
    obj[x] = {};

    return obj;
  }, {});

// tslint:disable-next-line: typedef
const readFile = (fileName) =>
  // tslint:disable-next-line: typedef
  new Promise((resolve, reject) => {
    // tslint:disable-next-line: typedef
    fs.readFile(fileName, 'utf8', (error, value) => (error ? reject(error) : resolve(value)));
  });

// tslint:disable-next-line: typedef
const extractMessages = async (oldMaps: LocaleMap) => {
  const cwd = process.cwd();
  const pattern = 'app/**/messages.ts*'; // 'app/**/!(*.test).ts*';

  process.stdout.write(`Extract Messages from ${pattern} \n`);

  const babel = getBabelrc(cwd) || {};

  const { presets } = babel;

  const plugins = babel.plugins || [];

  plugins.push('react-intl');

  // tslint:disable-next-line: typedef
  const extractFromFile = async (file: string) => {
    const code = await readFile(file);

    const output = await transform(code as string, { filename: file, presets, plugins });

    const messages = get(output, 'metadata.react-intl.messages', []);

    const localeMappings = localeMap(locales);

    // tslint:disable-next-line: typedef
    messages.forEach((message) => {
      locales.forEach((locale: string): void => {
        const oldLocaleMapping = oldMaps[locale][message.id];

        // Merge old translations into the babel extracted instances where react-intl is used
        const newMsg = `${message.defaultMessage || message.id}_${locale}`;

        localeMappings[locale][message.id] = oldLocaleMapping || newMsg;
      });
    });

    return localeMappings;
  };

  const files: string[] = await pify(glob)(pattern);

  if (files.length === 0) {
    throw new Error(`File not found (${pattern})`);
  }

  const arr = await Promise.all(files.map(extractFromFile));

  // tslint:disable-next-line: typedef
  return arr.reduce((h, obj) => merge(h, obj), localeMap(locales));
};

const loadLocaleFiles = (): LocaleMap => {
  const localeMaps: LocaleMap = {};

  try {
    mkdirp.sync(buildDir);
  } catch (error) {
    process.stdout.write(error);
  }

  locales.forEach((locale: string): void => {
    process.stdout.write(`Loading ${locale} translations\n`);

    const file = path.resolve(buildDir, `${locale}.json`);

    // Initialize json file
    try {
      const output = JSON.stringify({});

      fs.writeFileSync(file, output, { flag: 'wx' });
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }

    const messages = JSON.parse(fs.readFileSync(file, 'utf8'));

    localeMaps[locale] = {};

    Object.keys(messages).forEach((key: string): void => {
      const message = messages[key];

      if (message && typeof message === 'string' && message !== '') {
        localeMaps[locale][key] = messages[key];
      }
    });
  });

  return localeMaps;
};

const oldLocaleMaps = loadLocaleFiles();

// tslint:disable-next-line: typedef
extractMessages(oldLocaleMaps).then((newLocaleMaps) => {
  locales.forEach((locale: string): void => {
    process.stdout.write(`Writing updated ${locale} translation files\n`);

    const mapForThisLocale = newLocaleMaps[locale];

    const formattedLocaleMap: object = sortKeys(mapForThisLocale, { deep: true });

    // tslint:disable-next-line: typedef
    fs.writeFile(`${path.resolve(buildDir, locale)}.json`, JSON.stringify(formattedLocaleMap, null, 2), (err) => {
      if (err) {
        process.stderr.write(err.message);
      }
    });
  });
});
