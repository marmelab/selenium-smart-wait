import { Condition } from 'selenium-webdriver';
import getWebElements from './getWebElements';

export const checkElementsCountIsFactory = getWebElementsImpl => (elementOrSelector, count, waitTimeout) =>
    async (driver) => {
        const elements = await getWebElementsImpl(elementOrSelector, driver, waitTimeout);

        return Promise.resolve(elements && elements.length === count);
    };

export const elementIsClickedFactory = getWebElementsImpl => (elementOrSelector, count, waitTimeout) => {
    const checkElementsCountIs = checkElementsCountIsFactory(getWebElementsImpl);
    return new Condition('until element is clicked', checkElementsCountIs(elementOrSelector, count, waitTimeout));
};

export default elementIsClickedFactory(getWebElements);
