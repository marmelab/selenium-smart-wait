# selenium-smart-wait

[![Build Status](https://travis-ci.org/marmelab/selenium-smart-wait.svg?branch=master)](https://travis-ci.org/marmelab/selenium-smart-wait)

Conditions for common usage of [selenium-webdriver](http://seleniumhq.github.io/selenium/docs/api/javascript/index.html),
built to avoid random test failures on CI.

## Installation

Install with:

```sh
npm install --save-dev selenium-smart-wait
```

or

```sh
yarn add --dev selenium-smart-wait
```

## Usage

Simply import the exported conditions and pass them to `driver.wait`:

```js
import { elementValueIs } from 'selenium-smart-wait';
import { By } from 'selenium-webdriver';

// ... mocha, jasmine, whatever ...
await driver.wait(elementValueIs(By.css('.my-input'), 'expected value'));

```

All conditions expect either an existing [WebElement](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElement.html)
or a `locator` (see selenium webdriver documentation on [WebDriver](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html),
especially the `findElement` and `findElements` methods).

## API

- `elementValueIs`: wait until the element has the specified value. *You should only pass input elements to this condition.*
- `elementIsClicked`: wait until the element has been successfully clicked.

## Contributing

Coverage data is available in `./coverage` after executing `make test`.

An HTML report is generated in `./coverage/lcov-report/index.html`.
