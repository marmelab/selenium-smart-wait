import expect from 'expect';
import { until, By } from 'selenium-webdriver';

import driver from '../chromeWebDriver';
import { stalenessOf, elementIsClicked } from '../../src';
import { addTodo } from './helper';

describe('e2e', () => {
    describe('stalenessOf', () => {
        before(async () => {
            await driver.get('http://localhost:3000');
            await driver.wait(until.elementLocated(By.css('#header h1')));
        });

        it('should be rejected if element is still present after one second', async () => {
            const error = await driver.wait(stalenessOf('#header h1', 1000)).catch(e => e);
            expect(error.message).toContain('Waiting element to become stale');
        });

        it('should resolve if element do not exists', async () => {
            await driver.wait(stalenessOf('.not-found', 1000));
        });

        it('should resolve if element disappear', async () => {
            await addTodo(driver);
            const todo = await driver.findElement(By.css('.view'));
            await driver.wait(elementIsClicked('#filters li:nth-child(3) a', 1000));
            await driver.wait(stalenessOf(todo, 1000));
        });
    });
});
