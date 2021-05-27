# Runtime Configuration

The application's runtime configuration is based on settings contained in a .json file deployed with the application. This .json file may contain different setting values in each environment. Developers will only work directly with the `config.json` file located under the `/public` folder of the solution. The .json files for other environments are maintained as part of the CI/CD pipeline.

NOTE: Defaults are provided for each setting in the `/app/config.ts` file. These defaults are set to the production environment values and are only used if a value is not found in the `config.json` file deployed with the application. As a result, the `config.json` file only needs to include exceptions, or overrides, to the production settings.

## Settings

The following settings may be used to configure how the application runs, including what features are enabled.

| Name              |  Type   |                                  Description                                   | Default |
| :---------------- | :-----: | :----------------------------------------------------------------------------: | ------: |
| canChangeLanguage | boolean | Indicates whether users are allowed to change the current language at runtime. |   false |
| ordersEndpoint    | string  |               Contains the URL used to retrieve customer orders                |     tbd |
|                   |         |                                                                                |         |
