# <%= appNameSlug %>


[![npm](https://img.shields.io/npm/v/<%= appNameSlug %>.svg?style=flat-square)](https://www.npmjs.com/package/<%= appNameSlug %>)
[![linux build](https://img.shields.io/circleci/project/github/<%= userName %>/<%= appNameSlug %>/master.svg?label=linux&style=flat-square)](https://circleci.com/gh/<%= userName %>/<%= appNameSlug %>)
[![windows build](https://img.shields.io/appveyor/ci/<%= userName %>/<%= appNameSlug %>/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/<%= userName %>/<%= appNameSlug %>)
[![coverage](https://img.shields.io/codecov/c/github/<%= userName %>/<%= appNameSlug %>/master.svg?style=flat-square)](https://codecov.io/github/<%= userName %>/<%= appNameSlug %>)
[![deps](https://david-dm.org/<%= userName %>/<%= appNameSlug %>.svg?style=flat-square)](https://david-dm.org/<%= userName %>/<%= appNameSlug %>)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![greenkeeper](https://badges.greenkeeper.io/<%= userName %>/<%= appNameSlug %>.svg)](https://greenkeeper.io/)

<%= taskName %> task checker for [Start](https://github.com/start-runner/start)

## Install

```sh
npm install --save-dev <%= appNameSlug %>
# or
yarn add --dev <%= appNameSlug %>
```

## Usage

```js
import Start from 'start';
import reporter from 'start-pretty-reporter';
import files from 'start-files';
import <%= appNameCamel %> from '<%= appNameSlug %>';

const start = Start(reporter());

export const task = () => start(
  files([ 'lib/**/*.js', 'test/**/*.js' ]),
  <%= appNameCamel %>()
);
```

This task relies on array of files and provides the same, see [documentation](https://github.com/start-runner/start#readme) for details.

## Arguments

`<%= appNameCamel %>(<ARG1>, <ARG2>)`

* `<ARGUMENT NAME>` – `<ARGUMENT DESCRIPTION>`
