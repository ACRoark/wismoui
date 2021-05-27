# Tool Configuration

A guide to the configuration files for this project: where they live and what
they do.

## The root folder

- `.editorconfig`: Sets the default configuration for certain files across editors. (e.g. indentation)

- `.gitattributes`: Normalizes how `git`, the version control system this application uses, handles certain files.

- `.gitignore`: Tells `git` to ignore certain files and folders which don't need to be version controlled, like the build folder.

- `package.json`: Our `npm` configuration file has three functions:

  1.  It's where Babel, ESLint and TSLint are configured
  1.  It's the API for the project: a consistent interface for all its controls
  1.  It lists the project's package dependencies

## The `./internals` folder

This is where the bulk of the tooling configuration lives, broken out into recognizable units of work.

- `docker`
- `generators`
- `mocks`
- `scripts`
- `testing`
- `webpack`
