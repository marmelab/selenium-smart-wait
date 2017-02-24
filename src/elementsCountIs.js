import { Condition } from 'selenium-webdriver';
import getWebElements from './getWebElements';

export const checkElementsCountIsFactory = getWebElementsImpl =>
    (elementOrLocator, count, waitTimeout) =>
        async (driver) => {
            const elements = await getWebElementsImpl(elementOrLocator, driver, waitTimeout);

            return Promise.resolve(elements && elements.length === count);
        };

export const elementsCountIsFactory = checkElementsCountIs =>
    (elementOrLocator, count, waitTimeout) =>
        new Condition('until elements count is', checkElementsCountIs(elementOrLocator, count, waitTimeout));

export default elementsCountIsFactory(checkElementsCountIsFactory(getWebElements));
