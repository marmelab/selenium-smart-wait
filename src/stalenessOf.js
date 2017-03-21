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

            const elements = await driver.findElements(locator);

            if (elements.length > 0) {
                element = elements[0];
            }
        }

        if (!element) {
            return Promise.resolve(true);
        }

        return stalenessOfImpl(element);
    };

export default elementOrLocator =>
    new Condition('until element is stale', checkStalenessOfFactory(until.stalenessOf)(elementOrLocator));
