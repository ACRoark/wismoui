# Frequently Asked Questions

- [Frequently Asked Questions](#frequently-asked-questions)
  - [Where are Babel, Prettier, ESLint snd TSLint configured?](#where-are-babel-prettier-eslint-snd-tslint-configured)
  - [Where are the files coming from when I run `npm start`?](#where-are-the-files-coming-from-when-i-run-npm-start)
  - [Why do I need Node.js version 13 or later?](#why-do-i-need-nodejs-version-13-or-later)

## Where are Babel, Prettier, ESLint snd TSLint configured?

Babel, Prettier, ESLint and TSLint all have their own config files in the root of the project. Same for Jest and stylelint.

## Where are the files coming from when I run `npm start`?

In development, Webpack compiles the application and runs it in-memory using the built-in dev server. Only when you run `npm run build` (or `npm run build:dev`) will it write to disk and preserve your bundled application across restarts.

## Why do I need Node.js version 13 or later?

The application used the `react-intl` library for [**Internationalization and localization**](docs/i18n.md).  To function correctly, this library requires a set of APIs, known as ICU (International Components for Unicode), that provide settings and other information for each local.  As of March 2020, the authors of this library decided to stop including these APIs as part of their package because these APIs are now available as part of Node.js beginning with version 13.0.0.

You can use an earlier version of Node.js but it your `node` binary has to be either compiled with `full-icu` or use the `full-icu` npm package. See this page for more information: https://formatjs.io/docs/runtime-requirements/#full-icu
