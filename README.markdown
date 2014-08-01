# esdash

Functional programming helper library that is aware of (does not duplicate) the latest ECMAScript features, which are polyfillable in all ECMA-262 (even oldest browsers)

- [Overview](#overview)
- [Installation](#installation)
- [API](#api)
- [Development](#development)

## Overview

* Works on browsers and NodeJS.
* Tested on these browsers:
  * TODO

## Installation

  Install manually by adding to your HTML file:

    <script src="/path/to/esdash/index.umd.js"></script>

  Install with [npm](https://www.npmjs.org/package/esdash):

    $ npm install --save esdash

  Install with [component](http://component.io/jakutis/esdash):

    $ component install jakutis/esdash

  Install with [bower](http://bower.io):

    $ bower install --save esdash

## API

* all
* bindLeft
* bindRight
* copy
* dateRFC1123
* extend
* flatten
* noop
* notEmpty
* pad
* pass
* undefined
* unique
* zip

## Development

After cloning the repo, and on each modification of `index.js` file, you have to run `npm run compile`.

To run tests run `npm test`.

#### Checklist before releasing

* `npm run compile`.
* tests pass.
* package.json, bower.json and component.json version number bumped
* `release X.X.X` commit created and tagged as `X.X.X`.
* `npm publish`.
