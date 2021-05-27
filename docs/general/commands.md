# Command Line Commands

## Development

```Shell
npm run start
```

Starts the development server running on `http://localhost:3000`

## Generators

```Shell
npm run generate
```

Allows you to auto-generate boilerplate code for common parts of your application, specifically `component`s and `container`s.
You can also run `npm run generate <part>` to skip the first selection. (e.g. `npm run generate container`)

## Building

```Shell
npm run build
```

Preps your app for deployment (does not run tests). Optimizes and minifies all files, piping them to the `build` folder.

Upload the contents of `build` to your web server to see your work live!

## Testing

See the [testing documentation)[#testing/README.md] for detailed information about testing.

## Unit testing

```Shell
npm run test
```

Tests your application with the unit tests specified in the `**/tests/*.ts` files throughout the application.  
All the `test` commands allow an optional `-- [string]` argument to filter the tests run by Jest.
Useful if you need to run a specific test only.

```Shell
# Run only the Button component tests
npm run test -- Button
```

### Watching

```Shell
npm run test:watch
```

Watches changes to your application and re-runs tests whenever a file changes.

## Linting

```Shell
npm run lint
```

Lints all JavaScript, TypeScript and CSS/LESS files.

```Shell
npm run lint:fix
```

Lints your code and tries to fix any errors it finds.
