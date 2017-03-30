import { Condition } from 'selenium-webdriver';
import getWebElement from './getWebElement';

export const checkElementHasBeenSentKeysFactory = getWebElementImpl =>
    (elementOrLocator, keys) =>
        async (driver) => {
            const element = await getWebElementImpl(elementOrLocator, driver);

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
                    .sendKeys(keys)
                    .then(() => true)
                    .catch(() => false);
        };

export const elementHasBeenSentKeysFactory = checkElementHasBeenSentKeys =>
    (elementOrLocator, keys) =>
        new Condition('until element has been sent keys', checkElementHasBeenSentKeys(elementOrLocator, keys));

export default elementHasBeenSentKeysFactory(checkElementHasBeenSentKeysFactory(getWebElement));
