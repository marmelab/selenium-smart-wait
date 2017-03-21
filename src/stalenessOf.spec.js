import expect, { createSpy } from 'expect';
import { By, WebElement } from 'selenium-webdriver';

import { checkStalenessOfFactory } from './stalenessOf';

describe('stalenessOf', () => {
    const untilStalenessOf = createSpy().andReturn('until.stalenessOf result');
    const stalenessOf = checkStalenessOfFactory(untilStalenessOf);

    it('returns a promise resolving to true if called with no element', async () => {
        const driver = {
            findElement: createSpy().andReturn(Promise.resolve('element')),
        };
        expect(await stalenessOf()(driver)).toBe(true);
    });

    it('calls driver.findElement with a css locator if passed a string', async () => {
        const driver = {
            findElement: createSpy().andReturn(Promise.resolve('element')),
        };
        expect(await stalenessOf('.element')(driver)).toBe('until.stalenessOf result');
        expect(driver.findElement).toHaveBeenCalledWith(By.css('.element'));
        expect(untilStalenessOf).toHaveBeenCalledWith('element');
    });

    it('calls driver.findElement with the passed locator', async () => {
        const driver = {
            findElement: createSpy().andReturn(Promise.resolve('element')),
        };
        expect(await stalenessOf(By.css('.another_element'))(driver)).toBe('until.stalenessOf result');
        expect(driver.findElement).toHaveBeenCalledWith(By.css('.another_element'));
        expect(untilStalenessOf).toHaveBeenCalledWith('element');
    });

    it('returns true if element has not been found', async () => {
        const driver = {
            findElement: createSpy().andReturn(Promise.reject('not found error')),
        };
        expect(await stalenessOf(By.css('.another_element'))(driver)).toBe(true);
    });

    it('calls driver.findElement with the passed element', async () => {
        const driver = {
            controlFlow: () => ({ promise: () => {} }),
            findElement: createSpy().andReturn(Promise.resolve('element')),
        };
        const element = new WebElement(driver, 'foo');
        expect(await stalenessOf(element)(driver)).toBe('until.stalenessOf result');
        expect(untilStalenessOf).toHaveBeenCalledWith(element);
    });
});
