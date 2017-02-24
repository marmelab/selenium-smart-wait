import expect, { createSpy } from 'expect';
import { By, until, WebElement } from 'selenium-webdriver';
import getWebElement from './getWebElement';

describe('getWebElement', () => {
    const locatedElement = 'an element';

    const driver = {
        controlFlow: () => ({ promise: () => {} }),
        wait: createSpy(),
        findElement: createSpy().andReturn(Promise.resolve(locatedElement)),
    };

    const waitTimeout = 10000;

    it('returns the given webelement directly if it is a WebElement', async () => {
        const element = new WebElement(driver, 'foo');

        const result = await getWebElement(element);

        expect(result).toBe(element);
    });

    it('waits for the element with the given selector to be located', async () => {
        const selector = By.css('.foo');

        await getWebElement(selector, driver, waitTimeout);

        expect(driver.wait).toHaveBeenCalledWith(until.elementLocated(selector, waitTimeout));
    });

    it('returns the element with the given selector to be located', async () => {
        const selector = By.css('.foo');

        const result = await getWebElement(selector, driver, waitTimeout);

        expect(result).toBe(locatedElement);
    });
});
