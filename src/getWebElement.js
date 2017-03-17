import { until, By, WebElement } from 'selenium-webdriver';

export default (elementOrLocator, driver) => {
    if (elementOrLocator instanceof WebElement) {
        return elementOrLocator;
    }

    let locator = elementOrLocator;

    if (typeof elementOrLocator === 'string') {
        locator = By.css(elementOrLocator);
    }

    return driver
        .wait(until.elementLocated(locator))
        .then(() => driver.findElement(locator));
};
