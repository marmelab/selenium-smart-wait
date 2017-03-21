import { By, Condition, until, WebElement } from 'selenium-webdriver';

export const checkStalenessOfFactory = stalenessOfImpl => elementOrLocator =>
    async (driver) => {
        let element = elementOrLocator;

        if (elementOrLocator && !(elementOrLocator instanceof WebElement)) {
            element = null;
            let locator = elementOrLocator;

            if (typeof elementOrLocator === 'string') {
                locator = By.css(elementOrLocator);
            }

            [element] = await driver.findElements(locator);
        }

        if (!element) {
            return Promise.resolve(true);
        }

        return stalenessOfImpl(element);
    };

export default elementOrLocator =>
    new Condition('until element is stale', checkStalenessOfFactory(until.stalenessOf)(elementOrLocator));
