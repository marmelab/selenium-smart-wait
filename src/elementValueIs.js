import { Condition } from 'selenium-webdriver';
import getWebElement from './getWebElement';

export const checkElementValueIsFactory = getWebElementImpl =>
    (elementOrLocator, value) =>
        async (driver) => {
            const element = await getWebElementImpl(elementOrLocator, driver);
            return element.getAttribute('value').then(t => t === value);
        };

export const elementValueIsFactory = checkElementValueIs =>
    (elementOrLocator, value) =>
        new Condition('until element value is', checkElementValueIs(elementOrLocator, value));

export default elementValueIsFactory(checkElementValueIsFactory(getWebElement));

