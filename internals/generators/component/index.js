/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

const componentExists = require('./componentExists');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
    {
      default: 'Button',
      message: 'What should it be called?',
      name: 'name',
      type: 'input',
      validate: (value) => {
        if (/.+/.test(value)) {
          return componentExists(value) ? 'A component or container with this name already exists' : true;
        }

        return 'The name is required';
      },
    },
    {
      default: false,
      message: 'Do you want to wrap your component in React.memo?',
      name: 'memo',
      type: 'confirm',
    },
    {
      default: true,
      message: 'Do you want i18n messages (i.e. will this component use text)?',
      name: 'wantMessages',
      type: 'confirm',
    },
    {
      default: true,
      message: 'Do you want tests?',
      name: 'wantTests',
      type: 'confirm',
    },
  ],

  actions: (data) => {
    const actions = [
      {
        abortOnFail: true,
        path: '../../app/components/{{properCase name}}/index.tsx',
        templateFile: './component/index.tsx.hbs',
        type: 'add',
      },
    ];

    if (data.wantTests) {
      actions.push({
        abortOnFail: true,
        path: '../../app/components/{{properCase name}}/tests/index.test.tsx',
        templateFile: './component/test.tsx.hbs',
        type: 'add',
      });
    }

    if (data.wantMessages) {
      actions.push({
        abortOnFail: true,
        path: '../../app/components/{{properCase name}}/messages.ts',
        templateFile: './component/messages.ts.hbs',
        type: 'add',
      });
    }

    actions.push({
      abortOnFail: true,
      path: '/components/',
      templateFile: null,
      type: 'prettify',
    });

    return actions;
  },
};
