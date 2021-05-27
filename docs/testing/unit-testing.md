# Unit testing

Unit testing is the practice of testing the smallest possible _units_ of code (e.g. functions). Unit tests verify that functions do what is expected.

This application uses the [Jest](https://github.com/facebook/jest) test framework to run tests and make assertions. This library makes writing tests as easy as speaking - you `describe` a unit of your code and `expect` `it` to do the correct thing.

<!-- TOC depthFrom:2 depthTo:4 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Unit testing](#unit-testing)
  - [Basics](#basics)
    - [Jest](#jest)
    - [More to come...](#more-to-come)

<!-- /TOC -->

This glob pattern is used to find unit tests `app/**/*.test.ts(x)` in the application - this tells Jest to run all files that end with `.test.ts` or `.test.tsx` anywhere within the `app` folder. For consistency, all unit tests should be defined in a `/tests` folder next to the files you want to test.

Test files should also share the name of the file being tested.  So, for instance, if you are testing code in the `index.tsx` file, the test file would be named, `index.test.ts`. Similarly, if the file is `doSomething.ts`, the test file should be, `doSomething.text.ts`.

## Basics


### Jest

Jest is the unit testing framework used by this application. Its API, which we write tests with, is speech-like and easy to use.

> Note: The official documentation for Jest can be found [here](https://facebook.github.io/jest/).

### More to come...
 