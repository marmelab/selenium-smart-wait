import expect from 'expect';
import { By } from 'selenium-webdriver';

import driver from '../chromeWebDriver';
import { elementHasBeenSentKeys } from '../../src';

describe('e2e', () => {
    describe('elementHasBeenSentKeys', () => {
        before(async () => {
            await driver.get('http://localhost:3000/elementHasBeenSentKeys.html');
        });

        it('should send givenKeys to target element', async () => {
            const newTodo = await driver.findElement(By.css('#input'));
            expect(await newTodo.getAttribute('value')).toBe('');
            await driver.wait(elementHasBeenSentKeys('#input', 'hello todo', 1000));
            expect(await newTodo.getAttribute('value')).toBe('hello todo');
        });

        it('should reject if target element is a disabled input', async () => {
            const error = await driver.wait(elementHasBeenSentKeys('#disabled-input', 'hello todo', 1000)).catch(e => e);
            expect(error.message).toBe('Invalid element: must enable and visible');
        });

        it('should reject if target element is not an input nor text area', async () => {
            const error = await driver.wait(elementHasBeenSentKeys('#not-an-input', 'hello todo', 1000)).catch(e => e);
            expect(error.message).toBe('Invalid element: must be an input or a textarea');
        });

        it('should reject if target element do not exists', async () => {
            const error = await driver.wait(elementHasBeenSentKeys('.not-found', 'hello todo', 1000)).catch(e => e);
            expect(error.message).toContain('no such element: Unable to locate element:');
        });

        after(async () => {
            await driver.executeScript('localStorage.clear();');
            await driver.executeScript('sessionStorage.clear();');
        });
    });
});
