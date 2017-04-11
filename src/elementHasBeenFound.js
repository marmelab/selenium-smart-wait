import { By, WebElement, WebElementCondition } from 'selenium-webdriver';

export const elementHasBeenFoundFn = elementOrLocator => async driver => {
    try {
        if (elementOrLocator instanceof WebElement) {
            return Promise.resolve(elementOrLocator);
        }

        let locator = elementOrLocator;

        if (typeof elementOrLocator === 'string') {
            locator = By.css(elementOrLocator);
        }

        return await driver.findElement(locator);
    } catch (e) {
        return false;
    }
};

export default elementOrLocator =>
    new WebElementCondition('until element has been found', elementHasBeenFoundFn(elementOrLocator));
