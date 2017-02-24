import { Condition } from 'selenium-webdriver';
import getWebElement from './getWebElement';

export const checkElementHasBeenSentKeysFactory = getWebElementImpl =>
    (elementOrLocator, waitTimeout) =>
        async (driver) => {
            const element = await getWebElementImpl(elementOrLocator, driver, waitTimeout);

            const [isDisplayed, isEnabled, tagName] = await Promise.all([
                element.isDisplayed(),
                element.isEnabled(),
                element.getTagName(),
            ]);

            if (!['input', 'textarea'].includes(tagName.toLowerCase())) {
                throw new Error('Invalid element: must be an input or a textarea');
            }

            if (!isDisplayed || !isEnabled) return null;

            return element
                    .sendKeys('')
                    .then(() => true)
                    .catch(() => false);
        };

export const elementHasBeenSentKeysFactory = checkElementHasBeenSentKeys =>
    (elementOrLocator, waitTimeout) =>
        new Condition('until element has been sent keys', checkElementHasBeenSentKeys(elementOrLocator, waitTimeout));

export default elementHasBeenSentKeysFactory(checkElementHasBeenSentKeysFactory(getWebElement));
