import expect, { createSpy } from 'expect';
import { until, By, WebElement } from 'selenium-webdriver';
import getWebElement from './getWebElement';

describe('getWebElement', () => {
    const locatedElement = 'an element';

    const driver = {
        controlFlow: () => ({ promise: () => {} }),
        wait: createSpy().andReturn(Promise.resolve()),
        findElement: createSpy().andReturn(Promise.resolve(locatedElement)),
    };

    it('returns the given webelement directly if it is a WebElement', async () => {
        const element = new WebElement(driver, 'foo');

        const result = await getWebElement(element);

        expect(result).toBe(element);
    });

    it('calls driver.wait with a css locator if given a string', async () => {
        const locator = '.foo';

        await getWebElement(locator, driver);

        expect(driver.wait).toHaveBeenCalledWith(until.elementLocated(By.css(locator)));
    });

    it('waits for the element with the given locator to be located', async () => {
        const locator = By.css('.foo');

        await getWebElement(locator, driver);

        expect(driver.wait).toHaveBeenCalledWith(until.elementLocated(locator));
    });

    it('returns the element with the given locator to be located', async () => {
        const locator = By.css('.foo');

        const result = await getWebElement(locator, driver);

        expect(result).toBe(locatedElement);
    });
});
