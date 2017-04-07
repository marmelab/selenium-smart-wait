import expect from 'expect';
import { By } from 'selenium-webdriver';

import driver from '../chromeWebDriver';
import { elementValueIs } from '../../src';

describe('e2e', () => {
    describe('elementValueIs', () => {
        before(async () => {
            await driver.get('http://localhost:3000/elementValueIs.html');
        });

        it('should resolve if given value match target value', async () => {
            await driver.wait(elementValueIs('#input', 'input value', 1000));
        });

        it('should reject if given value does not match target value', async () => {
            const error = await driver.wait(elementValueIs('#input', 'wrong'), 1000).catch(e => e);
            expect(error.message).toContain('until element value is wrong');
        });

        it('should reject if target is not an input', async () => {
            const error = await driver.wait(elementValueIs('#not-an-input', 'input value'), 1000).catch(e => e);
            expect(error.message).toContain('until element value is input value');
        });
    });
});
