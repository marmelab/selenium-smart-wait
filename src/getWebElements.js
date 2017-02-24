import { until, By, WebElement } from 'selenium-webdriver';

export default async (elementOrLocator, driver) => {
    if (Array.isArray(elementOrLocator) && elementOrLocator.every(e => e instanceof WebElement)) {
        return elementOrLocator;
    }

    let locator = elementOrLocator;

    if (typeof elementOrLocator === 'string') {
        locator = By.css(elementOrLocator);
    }

    await driver.wait(until.elementLocated(locator));

    return driver.findElements(locator);
};
