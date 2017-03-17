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

const TIMEOUT = 5000;

// ... mocha, jasmine, whatever ...
await driver.wait(elementValueIs('.my-input', 'expected value'), TIMEOUT);

```

All conditions expect either an existing [WebElement](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebElement.html)
, a `locator` such as `By.css('.my_css_class')` (see selenium webdriver documentation on [WebDriver](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html),
especially the `findElement` and `findElements` methods) or a string. If a string is given, it will be considered as a css selector.

## API

- `elementsCountIs`: wait until the specified count of elements is found.
- `elementValueIs`: wait until the element has the specified value. *You should only pass input elements to this condition.*
- `elementIsClicked`: wait until the element has been successfully clicked.
- `elementHasBeenSentKeys`: wait until the element has successfully been sent keys clicked.

Some conditions from `selenium-webdriver` have also been added but you can now pass them a `locator` too (please refer to the
selenium webdriver [documentation](http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/until.html)
for details about them).

> *Important*: You must pass a timeout number as the *last* argument when calling these conditions:

- `elementIsDisabled`
- `elementIsEnabled`
- `elementIsNotSelected`
- `elementIsNotVisible`
- `elementIsSelected`
- `elementIsVisible`
- `elementTextContains`
- `elementTextIs`
- `elementTextMatches`
- `stalenessOf`

Use them like this:

```js
import { stalenessOf } from 'selenium-smart-wait';

const TIMEOUT = 5000;

// ... mocha, jasmine, whatever ...
await driver.wait(stalenessOf('.my-input', TIMEOUT));
```

## Contributing

Coverage data is available in `./coverage` after executing `make test`.

An HTML report is generated in `./coverage/lcov-report/index.html`.
