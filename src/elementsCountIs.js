import { Condition } from 'selenium-webdriver';
import getWebElements from './getWebElements';

export const checkElementsCountIsFactory = getWebElementsImpl =>
    (elementOrLocator, count) =>
        async (driver) => {
            const elements = await getWebElementsImpl(elementOrLocator, driver);

            return Promise.resolve(elements && elements.length === count);
        };

export const elementsCountIsFactory = checkElementsCountIs =>
    (elementOrLocator, count) =>
        new Condition(`until elements count is ${count}`, checkElementsCountIs(elementOrLocator, count));

export default elementsCountIsFactory(checkElementsCountIsFactory(getWebElements));
