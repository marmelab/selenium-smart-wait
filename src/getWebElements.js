import { until, WebElement } from 'selenium-webdriver';

export default async (elementOrSelector, driver) => {
    if (Array.isArray(elementOrSelector) && elementOrSelector.every(e => e instanceof WebElement)) {
        return elementOrSelector;
    }

    await driver.wait(until.elementLocated(elementOrSelector));

    return driver.findElements(elementOrSelector);
};
