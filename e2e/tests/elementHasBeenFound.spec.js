import expect from 'expect';
import { By } from 'selenium-webdriver';

import driver from '../chromeWebDriver';
import elementHasBeenFound from '../../src/elementHasBeenFound';

describe('e2e', () => {
    describe('elementHasBeenFound', () => {
        before(async () => {
            await driver.get('http://localhost:3000/getWebElement.html');
        });

        it('should return element when given a css selector', async () => {
            const el1 = await driver.wait(elementHasBeenFound('#button'), 1000);

            expect(await el1.getText()).toEqual('Click');
        });

        it('should return element when given a locator', async () => {
            const el1 = await driver.wait(elementHasBeenFound('#button'), 1000);

            expect(await el1.getText()).toEqual('Click');
        });

        it('should reject when no element correspond', async () => {
            const error = await driver.wait(elementHasBeenFound('#container p'), 1000).catch(e => e);
            expect(error.message).toContain('Waiting until element has been found');
        });

        it('should return element even when it appear afterward', async () => {
            driver.findElement(By.css('#button')).click();
            const el1 = await driver.wait(elementHasBeenFound('#container p'), 1000);
            expect(await el1.getText()).toEqual('hello');
        });
    });
});
