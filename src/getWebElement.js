import { By, WebElement } from 'selenium-webdriver';

export default (elementOrLocator, driver) => {
    if (elementOrLocator instanceof WebElement) {
        return Promise.resolve(elementOrLocator);
    }

    let locator = elementOrLocator;

    if (typeof elementOrLocator === 'string') {
        locator = By.css(elementOrLocator);
    }

    return driver.findElement(locator);
};
