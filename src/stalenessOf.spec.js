import expect, { createSpy } from 'expect';
import { By, WebElement } from 'selenium-webdriver';

import { checkStalenessOfFactory } from './stalenessOf';

describe('stalenessOf', () => {
    const untilStalenessOf = createSpy().andReturn('until.stalenessOf result');
    const stalenessOf = checkStalenessOfFactory(untilStalenessOf);

    it('returns a promise resolving to true if called with no element', async () => {
        const driver = {
            findElements: createSpy().andReturn(Promise.resolve(['element'])),
            wait: createSpy().andReturn('wait result'),
        };
        expect(await stalenessOf()(driver)).toBe(true);
    });

    it('calls driver.findElements with a css locator if passed a string', async () => {
        const driver = {
            findElements: createSpy().andReturn(Promise.resolve(['element'])),
            wait: createSpy().andReturn('wait result'),
        };
        expect(await stalenessOf('.element', 'timeout')(driver)).toBe('wait result');
        expect(driver.findElements).toHaveBeenCalledWith(By.css('.element'));
        expect(untilStalenessOf).toHaveBeenCalledWith('element');
        expect(driver.wait).toHaveBeenCalledWith('until.stalenessOf result', 'timeout');
    });

    it('calls driver.findElements with the passed locator', async () => {
        const driver = {
            findElements: createSpy().andReturn(Promise.resolve(['element'])),
            wait: createSpy().andReturn('wait result'),
        };

        expect(await stalenessOf(By.css('.another_element'), 'timeout')(driver)).toBe('wait result');

        expect(driver.findElements).toHaveBeenCalledWith(By.css('.another_element'));
        expect(untilStalenessOf).toHaveBeenCalledWith('element');
        expect(driver.wait).toHaveBeenCalledWith('until.stalenessOf result', 'timeout');
    });

    it('returns true if element has not been found', async () => {
        const driver = {
            findElements: createSpy().andReturn(Promise.resolve([])),
            wait: createSpy(),
        };
        expect(await stalenessOf(By.css('.another_element'))(driver)).toBe(true);
    });

    it('calls driver.findElements with the passed element', async () => {
        const driver = {
            controlFlow: () => ({ promise: () => {} }),
            wait: createSpy().andReturn('wait result'),
        };
        const element = new WebElement(driver, 'foo');
        expect(await stalenessOf(element, 'timeout')(driver)).toBe('wait result');
        expect(untilStalenessOf).toHaveBeenCalledWith(element);
        expect(driver.wait).toHaveBeenCalledWith('until.stalenessOf result', 'timeout');
    });
});
