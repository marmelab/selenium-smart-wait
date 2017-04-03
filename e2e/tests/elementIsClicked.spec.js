import expect from 'expect';
import { until, By } from 'selenium-webdriver';
import { addTodo } from './helper';

import driver from '../chromeWebDriver';
import { elementIsClicked } from '../../src';

describe('e2e', () => {
    describe('elementIsClicked', () => {
        before(async () => {
            await driver.get('http://localhost:3000');
            await driver.wait(until.elementLocated(By.css('#header h1')));
            await addTodo(driver);
        });

        it('should click element', async () => {
            let selectedFilter = await driver.findElement(By.css('.selected'));
            expect(await selectedFilter.getText()).toBe('All');
            await driver.wait(elementIsClicked('#filters li:nth-child(2) a', 1000));
            selectedFilter = await driver.findElement(By.css('.selected'));
            expect(await selectedFilter.getText()).toBe('Active');
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
