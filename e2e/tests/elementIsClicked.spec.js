import expect from 'expect';
import { By } from 'selenium-webdriver';

import driver from '../chromeWebDriver';
import { elementIsClicked } from '../../src';

describe('e2e', () => {
    describe('elementIsClicked', () => {
        before(async () => {
            await driver.get('http://localhost:3000/elementIsClicked.html');
        });

        it('should click element', async () => {
            let btn = await driver.findElement(By.css('#button'));
            expect(await btn.getText()).toBe('Click');
            await driver.wait(elementIsClicked('#button', 1000));
            btn = await driver.findElement(By.css('#button'));
            expect(await btn.getText()).toBe('clicked');
        });

        it('should be rejected if element do not exists', async () => {
            const error = await driver.wait(elementIsClicked('.not-found', 1000)).catch(e => e);
            expect(error.message).toContain('Unable to locate element:');
        });

        after(async () => {
            await driver.executeScript('localStorage.clear();');
            await driver.executeScript('sessionStorage.clear();');
        });
    });
});
