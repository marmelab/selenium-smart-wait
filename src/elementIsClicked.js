import { Condition } from 'selenium-webdriver';
import getWebElement from './getWebElement';

export const checkElementIsClickedFactory = getWebElementImpl => (elementOrSelector, waitTimeout) =>
    async (driver) => {
        const element = await getWebElementImpl(elementOrSelector, driver, waitTimeout);

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

export const elementIsClickedFactory = getWebElementImpl => (elementOrSelector, waitTimeout) => {
    const checkElementIsClicked = checkElementIsClickedFactory(getWebElementImpl);
    return new Condition('until element is clicked', checkElementIsClicked(elementOrSelector, waitTimeout));
};

export default elementIsClickedFactory(getWebElement);
