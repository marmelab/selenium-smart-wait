import expect, { createSpy } from 'expect';
import { By, until, WebElement } from 'selenium-webdriver';
import getWebElements from './getWebElements';

describe('getWebElements', () => {
    const locatedElement = 'an element';

    const driver = {
        controlFlow: () => ({ promise: () => {} }),
        wait: createSpy(),
        findElements: createSpy().andReturn(Promise.resolve([locatedElement])),
    };

    it('returns the given webelements directly if give an array of WebElement', async () => {
        const element = new WebElement(driver, 'foo');

        const result = await getWebElements([element]);

        expect(result).toEqual([element]);
    });

    it('waits for the element with the given selector to be located', async () => {
        const selector = By.css('.foo');

        await getWebElements(selector, driver);

        expect(driver.wait).toHaveBeenCalledWith(until.elementLocated(selector));
    });

    it('returns the element with the given selector to be located', async () => {
        const selector = By.css('.foo');

        const result = await getWebElements(selector, driver);
        expect(result).toEqual([locatedElement]);
    });
});
