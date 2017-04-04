import expect from 'expect';
import { until, By } from 'selenium-webdriver';
import { addTodo } from './helper';

import driver from '../chromeWebDriver';
import { elementsCountIs, elementIsClicked } from '../../src';

describe('e2e', () => {
    describe('elementsCountIs', () => {
        before(async () => {
            await driver.get('http://localhost:3000/elementCountIs.html');
            await driver.wait(until.elementLocated(By.css('#list')));
            await driver.wait(elementIsClicked('#add', 1000));
        });

        it('should resolve when element count match', async () => {
            await driver.wait(elementsCountIs('#list li', 1), 1000);
        });

        it('should reject when element count do not match', async () => {
            const error = await driver.wait(elementsCountIs('#list li', 2), 1000).catch(e => e);
            expect(error.message).toContain('Waiting until elements count is 2');
        });

        it('should resolve when element count match afterward', async () => {
            setTimeout(() => driver.wait(elementIsClicked('#add', 1000)), 500);
            await driver.wait(elementsCountIs('#list li', 2), 1000);
        });
    });
});
