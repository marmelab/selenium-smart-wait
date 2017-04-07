import expect from 'expect';
import { By } from 'selenium-webdriver';

import driver from '../chromeWebDriver';
import getWebElement from '../../src/getWebElement';

describe('e2e', () => {
    describe('getWebElement', () => {
        before(async () => {
            await driver.get('http://localhost:3000/getWebElement.html');
        });

        it('should return element when given a css selector', async () => {
            const el1 = await getWebElement('#button', driver);

            expect(await el1.getText()).toEqual('Click');
        });

        it('should return element when given a locator', async () => {
            const el1 = await getWebElement(By.css('#button'), driver);

            expect(await el1.getText()).toEqual('Click');
        });

        it('should reject when no element correspond', async () => {
            const error = await getWebElement(By.css('#container p'), driver).catch(e => e);

            expect(error.message).toContain('no such element: Unable to locate element: {"method":"css selector","selector":"#container p"}');
        });

        it('should return element even when it appear afterward', async () => {
            await driver.findElement(By.css('#button')).click();

            const el1 = await getWebElement(By.css('#container p'), driver);
            expect(await el1.getText()).toEqual('hello');
        });
    });
});
