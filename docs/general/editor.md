# Setting Up Your Editor

You can edit the application using any editor or IDE, but there are a few extra steps that you can take to make sure your coding experience is as good as it can be.

## VS Code

TODO: List recommended extensions and settings

# ESLint, TSLint + Prettier integration

You can also get VSCode to understand your project's static code analysis setup. If you do this:

- You'll see any warnings or errors directly within VSCode
- VSCode can also automatically fix or format your code for you

To make this happen, install both the ESLint and Prettier extensions for VSCode and add the following to either your User or Workspace Settings:

```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "editor.formatOnSave": true,
    "editor.tabSize": 2,
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact"
    ],
    "javascript.updateImportsOnFileMove.enabled": "always",
    "typescript.updateImportsOnFileMove.enabled": "always",
}
```

Here's also a detailed video on the topic: [How to Setup VS Code + Prettier + ESLint](https://www.youtube.com/watch?v=YIvjKId9m2c)
