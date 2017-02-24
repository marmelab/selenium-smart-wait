import { Condition } from 'selenium-webdriver';
import getWebElement from './getWebElement';

export const checkElementIsClickedFactory = getWebElementImpl =>
    (elementOrLocator, waitTimeout) =>
        async (driver) => {
            const element = await getWebElementImpl(elementOrLocator, driver, waitTimeout);

            const [isDisplayed, isEnabled] = await Promise.all([
                element.isDisplayed(),
                element.isEnabled(),
            ]);

            if (!isDisplayed || !isEnabled) return null;

            return element
                    .click()
                    .then(() => true)
                    .catch(() => false);
        };

export const elementIsClickedFactory = checkElementIsClicked =>
    (elementOrLocator, waitTimeout) =>
        new Condition('until element is clicked', checkElementIsClicked(elementOrLocator, waitTimeout));

export default elementIsClickedFactory(checkElementIsClickedFactory(getWebElement));
