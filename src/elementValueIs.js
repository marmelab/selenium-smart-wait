import { Condition } from 'selenium-webdriver';
import getWebElement from './getWebElement';

export const checkElementValueIsFactory = getWebElementImpl =>
    (elementOrLocator, value, waitTimeout) =>
        async (driver) => {
            const element = await getWebElementImpl(elementOrLocator, driver, waitTimeout);
            return element.getAttribute('value').then(t => t === value);
        };

export const elementValueIsFactory = checkElementValueIs =>
    (elementOrLocator, value, waitTimeout) =>
        new Condition('until element value is', checkElementValueIs(elementOrLocator, value, waitTimeout));

export default elementValueIsFactory(checkElementValueIsFactory(getWebElement));

