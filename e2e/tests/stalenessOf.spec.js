import expect from 'expect';
import { By } from 'selenium-webdriver';

import driver from '../chromeWebDriver';
import { stalenessOf } from '../../src';

describe('e2e', () => {
    describe('stalenessOf', () => {
        before(async () => {
            await driver.get('http://localhost:3000/stalenessOf.html');
        });

        it('should be rejected if element is still present after one second', async () => {
            const error = await driver.wait(stalenessOf('#hello', 1000)).catch(e => e);
            expect(error.message).toContain('Waiting element to become stale');
        });

        it('should resolve if element do not exists', async () => {
            await driver.wait(stalenessOf('.not-found', 1000));
        });

        it('should resolve if element disappear', async () => {
            await driver.findElement(By.css('#button')).click();
            await driver.wait(stalenessOf('#hello', 1000));
        });
    });
});
