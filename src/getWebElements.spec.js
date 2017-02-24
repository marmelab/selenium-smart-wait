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

    it('calls driver.wait with a css locator if given a string', async () => {
        const locator = '.foo';

        await getWebElements(locator, driver);

        expect(driver.wait).toHaveBeenCalledWith(until.elementLocated(By.css(locator)));
    });

    it('waits for the element with the given locator to be located', async () => {
        const locator = By.css('.foo');

        await getWebElements(locator, driver);

        expect(driver.wait).toHaveBeenCalledWith(until.elementLocated(locator));
    });

    it('returns the element with the given locator to be located', async () => {
        const locator = By.css('.foo');

        const result = await getWebElements(locator, driver);
        expect(result).toEqual([locatedElement]);
    });
});
