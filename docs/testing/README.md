# Testing

- [Unit Testing](unit-testing.md)
- [Component Testing](component-testing.md)
- [End-to-End Testing](e2e-testing.md)

Testing the application is a vital part of serious development. There are a few types of testing that should be performed to ensure the quality of the application.  All logic found in functions, hooks, etc. should be [unit tested](unit-testing.md). The visual elements of the application should be verified with [component testing](component-testing.md).  And, ultimately, the business requirements should be confirmed by [end-to-end testing](e2e-testing.md)

## Usage with this application

To test the application:

1.  Add `.test.ts` (or `.test.tsx`) files in a `/tests` folder directly next to the parts of the application you want to test.

1.  Write your unit and component tests in those files.

1.  Run `npm run test` at the command line and see all the tests pass! (hopefully)

There are a few more commands related to testing, checkout the [commands documentation](../commands.md#testing)
for the full list!
