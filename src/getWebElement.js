import { until, WebElement } from 'selenium-webdriver';

export default async (elementOrSelector, driver) => {
    if (elementOrSelector instanceof WebElement) {
        return elementOrSelector;
    }

    await driver.wait(until.elementLocated(elementOrSelector));

    return driver.findElement(elementOrSelector);
};
