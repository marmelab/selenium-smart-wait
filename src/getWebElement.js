import { until, WebElement } from 'selenium-webdriver';

export default async function getWebElement(elementOrSelector, driver, waitTimeout) {
    if (elementOrSelector instanceof WebElement) {
        return elementOrSelector;
    }

    await driver.wait(until.elementLocated(elementOrSelector, waitTimeout));

    return driver.findElement(elementOrSelector);
}
