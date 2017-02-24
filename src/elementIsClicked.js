import { Condition } from 'selenium-webdriver';
import getWebElement from './getWebElement';

export const checkElementIsClickedFactory = getWebElementImpl =>
    elementOrLocator =>
        async (driver) => {
            const element = await getWebElementImpl(elementOrLocator, driver);

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
    elementOrLocator =>
        new Condition('until element is clicked', checkElementIsClicked(elementOrLocator));

export default elementIsClickedFactory(checkElementIsClickedFactory(getWebElement));
