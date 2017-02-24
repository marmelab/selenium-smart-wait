import { until, WebElement } from 'selenium-webdriver';

export default async function getWebElements(elementOrSelector, driver, waitTimeout) {
    if (Array.isArray(elementOrSelector) && elementOrSelector.every(e => e instanceof WebElement)) {
        return elementOrSelector;
    }

    await driver.wait(until.elementLocated(elementOrSelector, waitTimeout));

    return driver.findElements(elementOrSelector);
}
