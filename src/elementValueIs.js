import { Condition } from 'selenium-webdriver';
import getWebElement from './getWebElement';

export const checkElementValueIsFactory = getWebElementImpl => (elementOrSelector, value, waitTimeout) =>
    async (driver) => {
        const element = await getWebElementImpl(elementOrSelector, driver, waitTimeout);
        return element.getAttribute('value').then(t => t === value);
    };

export const elementValueIsFactory = getWebElementImpl => (elementOrSelector, value, waitTimeout) => {
    const checkElementValueIs = checkElementValueIsFactory(getWebElementImpl);
    return new Condition('until element value is', checkElementValueIs(elementOrSelector, value, waitTimeout));
};

export default elementValueIsFactory(getWebElement);

