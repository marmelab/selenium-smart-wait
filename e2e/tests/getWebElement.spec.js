import expect from 'expect';

import driver from '../chromeWebDriver';
import getWebElement from '../../src/getWebElement';

describe('e2e', () => {
    describe('getWebElement', () => {
        before(async () => {
            await driver.get('http://localhost:3000');
        });

        it('should return element for css selector', async () => {
            const el1 = await getWebElement('#header h1', driver);

            expect(await el1.getText()).toEqual('todos');
        });
    });
});
