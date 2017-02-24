import { Condition } from 'selenium-webdriver';
import getWebElement from './getWebElement';

export const checkElementHasBeenSentKeysFactory = getWebElementImpl => (elementOrSelector, waitTimeout) =>
    async (driver) => {
        const element = await getWebElementImpl(elementOrSelector, driver, waitTimeout);

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

export const elementHasBeenSentKeysFactory = getWebElementImpl => (elementOrSelector, waitTimeout) => {
    const checkElementHasBeenSentKeys = checkElementHasBeenSentKeysFactory(getWebElementImpl);
    return new Condition('until element has been sent keys', checkElementHasBeenSentKeys(elementOrSelector, waitTimeout));
};

export default elementHasBeenSentKeysFactory(getWebElement);
