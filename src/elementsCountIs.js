import { Condition } from 'selenium-webdriver';
import getWebElements from './getWebElements';

export const checkElementsCountIsFactory = getWebElementsImpl =>
    (elementOrLocator, count, waitTimeout) =>
        async (driver) => {
            const elements = await getWebElementsImpl(elementOrLocator, driver, waitTimeout);

            return Promise.resolve(elements && elements.length === count);
        };

export const elementIsClickedFactory = checkElementsCountIs =>
    (elementOrLocator, count, waitTimeout) =>
        new Condition('until element is clicked', checkElementsCountIs(elementOrLocator, count, waitTimeout));

export default elementIsClickedFactory(checkElementsCountIsFactory(getWebElements));
